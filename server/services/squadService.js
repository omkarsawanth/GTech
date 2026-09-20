import { db } from '../config/firebaseAdmin.js';
import crypto from 'crypto';

/**
 * Generate a clean, high-entropy 6-character squad invite code.
 * Example: 'KLP-8A', 'NX92Q4'
 */
const generateInviteCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

/**
 * Creates a new squad room.
 * Stores doc in squads/{squadId} and links squadId to users/{uid}.
 */
export const createSquad = async (uid, { name, careerFocus = 'Software Engineer' }) => {
  const squadRef = db.collection('squads').doc();
  const inviteCode = generateInviteCode();
  const now = new Date();

  const userDoc = await db.collection('users').doc(uid).get();
  const userData = userDoc.exists ? userDoc.data() : {};

  const squadData = {
    id: squadRef.id,
    name: name.trim(),
    careerFocus,
    inviteCode,
    createdBy: uid,
    maxMembers: 5,
    memberUids: [uid],
    members: [
      {
        uid,
        joinedAt: now.toISOString(),
        role: 'Founder',
      }
    ],
    activityFeed: [
      {
        id: `act-${Date.now()}`,
        type: 'squad_created',
        text: `Squad "${name.trim()}" initialized. Mission lock active.`,
        timestamp: now.toISOString(),
      }
    ],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  await squadRef.set(squadData);

  // Link to user profile
  await db.collection('users').doc(uid).set(
    {
      squadId: squadRef.id,
      lastActiveAt: now.toISOString(),
    },
    { merge: true }
  );

  return await getSquadDetails(uid, squadRef.id);
};

/**
 * Join an existing squad using an invite code.
 */
export const joinSquad = async (uid, { inviteCode }) => {
  const normalizedCode = inviteCode.trim().toUpperCase();
  const squadQuery = await db.collection('squads').where('inviteCode', '==', normalizedCode).limit(1).get();

  if (squadQuery.empty) {
    const error = new Error('Invalid invite code. No squad found with that code.');
    error.statusCode = 404;
    throw error;
  }

  const squadDoc = squadQuery.docs[0];
  const squad = squadDoc.data();

  // Check if user is already in squad
  const isAlreadyMember = squad.members.some((m) => m.uid === uid);
  if (isAlreadyMember) {
    await db.collection('users').doc(uid).set({ squadId: squad.id, lastActiveAt: new Date().toISOString() }, { merge: true });
    return await getSquadDetails(uid, squad.id);
  }

  // Check capacity (max 5 members)
  if (squad.members.length >= (squad.maxMembers || 5)) {
    const error = new Error('This squad room is full (max 5 members reached).');
    error.statusCode = 400;
    throw error;
  }

  const now = new Date();
  const userDoc = await db.collection('users').doc(uid).get();
  const userData = userDoc.exists ? userDoc.data() : {};
  const memberName = userData.displayHandle 
    ? `@${userData.displayHandle}` 
    : (userData.leaderboardOptIn ? (userData.displayName || 'A new recruit') : 'An anonymous peer');

  const updatedMembers = [
    ...squad.members,
    {
      uid,
      joinedAt: now.toISOString(),
      role: 'Member',
    }
  ];
  const updatedMemberUids = Array.from(new Set([...(squad.memberUids || squad.members.map(m => m.uid)), uid]));

  const updatedFeed = [
    {
      id: `act-${Date.now()}`,
      type: 'member_joined',
      text: `${memberName} joined the squad.`,
      timestamp: now.toISOString(),
    },
    ...(squad.activityFeed || []).slice(0, 19),
  ];

  await squadDoc.ref.update({
    memberUids: updatedMemberUids,
    members: updatedMembers,
    activityFeed: updatedFeed,
    updatedAt: now.toISOString(),
  });

  await db.collection('users').doc(uid).set(
    {
      squadId: squad.id,
      lastActiveAt: now.toISOString(),
    },
    { merge: true }
  );

  return await getSquadDetails(uid, squad.id);
};

/**
 * Leave current squad.
 */
export const leaveSquad = async (uid, squadId) => {
  const squadRef = db.collection('squads').doc(squadId);
  const squadSnap = await squadRef.get();

  if (!squadSnap.exists) {
    await db.collection('users').doc(uid).set({ squadId: null }, { merge: true });
    return { success: true };
  }

  const squad = squadSnap.data();
  const updatedMembers = squad.members.filter((m) => m.uid !== uid);
  const updatedMemberUids = (squad.memberUids || squad.members.map((m) => m.uid)).filter((id) => id !== uid);

  if (updatedMembers.length === 0) {
    await squadRef.delete();
  } else {
    await squadRef.update({
      memberUids: updatedMemberUids,
      members: updatedMembers,
      updatedAt: new Date().toISOString(),
    });
  }

  await db.collection('users').doc(uid).set({ squadId: null }, { merge: true });
  return { success: true };
};

/**
 * Get squad details, resolving privacy-safe member profiles and active indicators.
 */
export const getSquadDetails = async (currentUid, squadId) => {
  let targetSquadId = squadId;

  if (!targetSquadId) {
    const userDoc = await db.collection('users').doc(currentUid).get();
    if (!userDoc.exists || !userDoc.data().squadId) {
      return null;
    }
    targetSquadId = userDoc.data().squadId;
  }

  const squadSnap = await db.collection('squads').doc(targetSquadId).get();
  if (!squadSnap.exists) {
    return null;
  }

  const squad = squadSnap.data();

  const memberPromises = squad.members.map(async (m, index) => {
    try {
      const uDoc = await db.collection('users').doc(m.uid).get();
      if (!uDoc.exists) {
        return {
          uid: m.uid,
          handle: `Agent #${m.uid.slice(0, 4)}`,
          displayName: `Candidate #${index + 1}`,
          streak: 1,
          readiness: 65,
          targetCareer: squad.careerFocus,
          isCurrentUser: m.uid === currentUid,
          role: m.role,
          isActiveNow: false,
        };
      }

      const uData = uDoc.data();
      const isSelf = m.uid === currentUid;
      const canShowHandle = isSelf || (uData.leaderboardOptIn && uData.displayHandle);
      const canShowName = isSelf || (uData.leaderboardOptIn && uData.displayName);

      const lastActive = uData.lastActiveAt ? new Date(uData.lastActiveAt) : null;
      const isActiveNow = lastActive ? (Date.now() - lastActive.getTime() < 15 * 60 * 1000) : false;

      return {
        uid: m.uid,
        handle: canShowHandle ? `@${uData.displayHandle || uData.displayName?.split(' ')[0].toLowerCase()}` : `Agent #${m.uid.slice(0, 4)}`,
        displayName: canShowName ? uData.displayName : (isSelf ? 'You' : `Candidate #${index + 1}`),
        streak: uData.currentStreak || 1,
        readiness: uData.readinessScore || 70,
        targetCareer: uData.targetCareer || squad.careerFocus,
        isCurrentUser: isSelf,
        role: m.role,
        isActiveNow: isActiveNow || isSelf,
      };
    } catch (err) {
      return {
        uid: m.uid,
        handle: `Agent #${index + 1}`,
        displayName: `Candidate #${index + 1}`,
        streak: 1,
        readiness: 65,
        targetCareer: squad.careerFocus,
        isCurrentUser: m.uid === currentUid,
        role: m.role,
        isActiveNow: false,
      };
    }
  });

  const members = await Promise.all(memberPromises);

  const totalStreak = members.reduce((sum, m) => sum + (m.streak || 0), 0);
  const avgReadiness = Math.round(members.reduce((sum, m) => sum + (m.readiness || 0), 0) / (members.length || 1));

  return {
    id: squad.id,
    name: squad.name,
    careerFocus: squad.careerFocus,
    inviteCode: squad.inviteCode,
    createdBy: squad.createdBy,
    maxMembers: squad.maxMembers || 5,
    memberCount: members.length,
    spotsRemaining: Math.max(0, (squad.maxMembers || 5) - members.length),
    totalStreak,
    avgReadiness,
    members,
    activityFeed: squad.activityFeed || [],
    createdAt: squad.createdAt,
  };
};
