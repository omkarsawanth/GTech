import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  UserPlus, 
  LogOut, 
  AlertCircle,
  Activity,
  Award,
  Crown,
  Lock
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { Button, Card, Badge } from '../components/common/UIComponents';
import { useAuth } from '../context/AuthContext';
import { 
  fetchCurrentSquadAPI, 
  createSquadAPI, 
  joinSquadAPI, 
  leaveSquadAPI 
} from '../services/aiService';
import { exportSquadInvitePNG } from '../utils/canvasExport';

export const SquadPage = () => {
  const { user } = useAuth();
  const [squad, setSquad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Form states
  const [newSquadName, setNewSquadName] = useState('');
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [careerFocusInput, setCareerFocusInput] = useState('Software Engineer');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const loadSquadData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetchCurrentSquadAPI();
      setSquad(res?.data || null);
    } catch (err) {
      console.warn('Failed to load squad:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSquadData();
  }, []);

  const handleCreateSquad = async (e) => {
    e.preventDefault();
    if (!newSquadName.trim()) return;
    setCreating(true);
    setErrorMsg(null);
    try {
      const res = await createSquadAPI(newSquadName.trim(), careerFocusInput);
      setSquad(res?.data);
      setShowCreateModal(false);
      setNewSquadName('');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create squad room.');
    } finally {
      setCreating(false);
    }
  };

  const handleJoinSquad = async (e) => {
    e.preventDefault();
    if (!inviteCodeInput.trim()) return;
    setJoining(true);
    setErrorMsg(null);
    try {
      const res = await joinSquadAPI(inviteCodeInput.trim());
      setSquad(res?.data);
      setShowJoinModal(false);
      setInviteCodeInput('');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to join squad with that code.');
    } finally {
      setJoining(false);
    }
  };

  const handleLeaveSquad = async () => {
    if (!squad?.id) return;
    if (!window.confirm('Are you sure you want to leave this squad?')) return;
    try {
      await leaveSquadAPI(squad.id);
      setSquad(null);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to leave squad.');
    }
  };

  const handleCopyCode = () => {
    if (!squad?.inviteCode) return;
    navigator.clipboard.writeText(squad.inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyInviteLink = () => {
    if (!squad?.inviteCode) return;
    const url = `${window.location.origin}/onboarding?squadInviteCode=${squad.inviteCode}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportInviteCard = () => {
    if (!squad) return;
    exportSquadInvitePNG({
      squadName: squad.name,
      inviteCode: squad.inviteCode,
      careerFocus: squad.careerFocus,
      membersCount: squad.memberCount,
      maxMembers: squad.maxMembers || 5,
      spotsRemaining: squad.spotsRemaining,
    });
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-16">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E232F] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="warning" size="sm" className="font-mono text-[10px] uppercase tracking-wider">
                PEER SYNERGY // RETENTION PROTOCOL
              </Badge>
              <span className="text-xs font-mono text-[#6B7688]">ROOM LIMIT: 5 SEATS</span>
            </div>
            <h1 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight flex items-center gap-3">
              Squad Rooms
              <span className="text-sm font-mono font-normal px-2.5 py-0.5 rounded-full bg-[#161B24] border border-[#2B3242] text-gorange">
                BETA
              </span>
            </h1>
            <p className="text-xs font-mono text-[#8F9AA9] mt-1">
              Accountability peer pods. Lock in a 5-member unit, pool streak momentum, and sprint together.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!squad ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowJoinModal(true)}
                  className="font-mono text-xs border-[#2B3242] hover:border-white"
                >
                  <UserPlus className="w-3.5 h-3.5 mr-1.5 text-[#8F9AA9]" />
                  Enter Passcode
                </Button>
                <Button 
                  variant="solar" 
                  size="sm" 
                  onClick={() => setShowCreateModal(true)}
                  className="font-mono text-xs font-bold shadow-lg shadow-rose-950/40"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Create Squad
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportInviteCard}
                  className="font-mono text-xs border-[#2B3242] hover:border-gorange text-white"
                >
                  <Share2 className="w-3.5 h-3.5 mr-1.5 text-gorange" />
                  Export Invite Card PNG
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLeaveSquad}
                  className="font-mono text-xs border-rose-900/40 text-rose-400 hover:bg-rose-950/30"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1" />
                  Leave
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded flex items-center gap-2.5 text-rose-300 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border border-[#1E232F] border-t-gorange animate-spin mx-auto mb-4" />
            <div className="font-mono text-xs uppercase tracking-widest text-[#8F9AA9]">
              ACCESSING SQUAD ROOM FREQUENCY...
            </div>
          </div>
        ) : !squad ? (
          /* Empty State: No Squad */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <Card className="p-8 border-[#1E232F] bg-[#0A0C12] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Users className="w-44 h-44 text-white" />
              </div>

              <div>
                <Badge variant="solar" size="sm" className="font-mono text-[10px] mb-4">
                  OPTION 01 // INITIATIVE
                </Badge>
                <h2 className="font-display font-black text-2xl text-white mb-2">
                  Assemble Your 5-Seat Squad
                </h2>
                <p className="text-xs text-[#8F9AA9] leading-relaxed mb-6">
                  Create a locked peer room for your career domain. Invite your cohort, challenge each other’s streaks, and review roasted skill-gaps in private.
                </p>

                <div className="space-y-2 mb-8 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gorange" />
                    <span>Scarcity-locked at exactly 5 candidates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span>Real-time active indicators & streak pooling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-violet-400" />
                    <span>Zero name leakage — handles only with opt-in</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="solar" 
                onClick={() => setShowCreateModal(true)}
                className="w-full font-mono text-xs font-bold py-3 shadow-lg shadow-rose-950/40"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Initialize New Squad Room
              </Button>
            </Card>

            <Card className="p-8 border-[#1E232F] bg-[#0A0C12] flex flex-col justify-between">
              <div>
                <Badge variant="outline" size="sm" className="font-mono text-[10px] mb-4 border-[#2B3242] text-[#8F9AA9]">
                  OPTION 02 // ACCESS PASSCODE
                </Badge>
                <h2 className="font-display font-black text-2xl text-white mb-2">
                  Join with Passcode
                </h2>
                <p className="text-xs text-[#8F9AA9] leading-relaxed mb-6">
                  Received an invite card or 6-character code from a peer? Paste it below to slip into their room before the seats fill up.
                </p>

                <form onSubmit={handleJoinSquad} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#8F9AA9] uppercase tracking-wider mb-2">
                      SQUAD PASSCODE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9F4A1C"
                      value={inviteCodeInput}
                      onChange={(e) => setInviteCodeInput(e.target.value.toUpperCase())}
                      className="w-full bg-[#10131A] border border-[#2B3242] text-white px-4 py-3 font-mono text-lg tracking-widest uppercase focus:outline-none focus:border-gorange"
                      maxLength={10}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="outline" 
                    disabled={joining || !inviteCodeInput.trim()}
                    className="w-full font-mono text-xs border-[#2B3242] hover:border-white py-3"
                  >
                    {joining ? 'VERIFYING CODE...' : 'JOIN SQUAD ROOM ➔'}
                  </Button>
                </form>
              </div>

              <div className="pt-6 border-t border-[#1E232F] text-[11px] font-mono text-[#6B7688]">
                💡 You can also join automatically by opening a shared invite link.
              </div>
            </Card>
          </div>
        ) : (
          /* Active Squad Room State */
          <div className="space-y-6">
            {/* Scarcity Banner when < 3 members */}
            {squad.memberCount < 3 && (
              <div className="p-4 bg-gradient-to-r from-solar-coral/15 to-solar-amber/10 border border-solar-coral/30 rounded flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-solar-coral/20 border border-solar-coral/40 flex items-center justify-center text-rose-400 shrink-0 font-bold">
                    !
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      EARLY ADOPTER ADVANTAGE
                    </div>
                    <div className="text-xs text-rose-200/80">
                      Only {squad.memberCount} people know about this room — get your friends in before the 5-seat cap locks permanently.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="solar"
                    size="sm"
                    onClick={handleExportInviteCard}
                    className="text-xs font-mono font-bold"
                  >
                    <Share2 className="w-3.5 h-3.5 mr-1" />
                    Share Invite Card
                  </Button>
                </div>
              </div>
            )}

            {/* Room Hero HUD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-5 border-[#1E232F] bg-[#0A0C12] md:col-span-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B7688]">
                      FOCUS: {squad.careerFocus}
                    </span>
                    <h2 className="font-display font-black text-2xl text-white mt-1">
                      {squad.name}
                    </h2>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[10px] uppercase text-[#6B7688]">CAPACITY</span>
                    <div className="text-base font-bold text-white">
                      {squad.memberCount} / {squad.maxMembers} SEATS
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#1E232F] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-4 text-[#8F9AA9]">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-gorange" />
                      <span className="text-white font-bold">{squad.totalStreak}d</span> pooled streak
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-violet-400" />
                      <span className="text-white font-bold">{squad.avgReadiness}%</span> avg readiness
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[#6B7688]">PASSCODE:</span>
                    <span className="bg-[#141822] px-2 py-1 border border-[#2B3242] text-gorange font-bold tracking-wider">
                      {squad.inviteCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      title="Copy Passcode"
                      className="p-1 hover:text-white text-[#8F9AA9]"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={handleCopyInviteLink}
                      title="Copy Direct Invite Link"
                      className="text-[11px] text-[#8F9AA9] hover:text-white underline ml-2"
                    >
                      {copiedLink ? 'Link Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-[#1E232F] bg-[#0A0C12] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B7688] mb-1">
                    ROOM SECURITY & PRIVACY
                  </div>
                  <div className="text-xs text-[#8F9AA9] leading-relaxed">
                    Unconsenting members are masked with anonymized candidate monikers. Opt into the public leaderboard anytime to showcase your handle.
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportInviteCard}
                  className="w-full mt-3 font-mono text-xs border-[#2B3242] hover:border-gorange text-white"
                >
                  <Share2 className="w-3.5 h-3.5 mr-1.5 text-gorange" />
                  Generate Room Pass PNG
                </Button>
              </Card>
            </div>

            {/* Member Cards Grid (Up to 5) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8F9AA9] flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-gorange" />
                  ROSTER ({squad.memberCount} OF 5 SLOTS FILLED)
                </h3>
                {squad.spotsRemaining > 0 && (
                  <span className="text-xs font-mono text-gorange">
                    {squad.spotsRemaining} seat{squad.spotsRemaining > 1 ? 's' : ''} available
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {squad.members.map((member, index) => (
                  <Card 
                    key={member.uid || index}
                    className={`p-4 border ${member.isCurrentUser ? 'border-gorange/50 bg-[#121620]' : 'border-[#1E232F] bg-[#0A0C12]'} relative`}
                  >
                    {/* Founder Crown */}
                    {member.role === 'Founder' && (
                      <div className="absolute top-3 right-3 text-solar-amber" title="Squad Founder">
                        <Crown className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Active Now Status Light */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${member.isActiveNow ? 'bg-emerald-400 animate-pulse' : 'bg-[#3B4455]'}`} />
                      <span className="text-[10px] font-mono text-[#6B7688] uppercase">
                        {member.isActiveNow ? 'ACTIVE NOW' : 'OFFLINE'}
                      </span>
                    </div>

                    <div className="w-10 h-10 bg-[#161B26] border border-[#2B3242] rounded flex items-center justify-center font-mono font-bold text-sm text-white mb-2">
                      {member.displayName?.charAt(0) || 'U'}
                    </div>

                    <div className="font-display font-bold text-sm text-white truncate">
                      {member.displayName}
                    </div>
                    <div className="text-[11px] font-mono text-gorange truncate">
                      {member.handle}
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#1E232F] space-y-1 text-[11px] font-mono text-[#8F9AA9]">
                      <div className="flex justify-between">
                        <span>STREAK</span>
                        <span className="text-white font-bold flex items-center gap-1">
                          <Flame className="w-3 h-3 text-rose-400" />
                          {member.streak}d
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>READINESS</span>
                        <span className="text-white font-bold">{member.readiness}%</span>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Empty Slots */}
                {Array.from({ length: squad.spotsRemaining }).map((_, i) => (
                  <div 
                    key={`empty-${i}`}
                    onClick={handleExportInviteCard}
                    className="p-4 border border-dashed border-[#232938] bg-[#07090E]/50 rounded flex flex-col items-center justify-center text-center hover:border-gorange/40 cursor-pointer transition-colors min-h-[180px]"
                  >
                    <UserPlus className="w-6 h-6 text-[#475266] mb-2" />
                    <div className="font-mono text-xs text-[#8F9AA9] uppercase font-bold">
                      SLOT #{squad.memberCount + i + 1} OPEN
                    </div>
                    <div className="text-[10px] font-mono text-[#525E73] mt-1">
                      Click to share invite card
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Squad Activity Feed */}
            <Card className="p-5 border-[#1E232F] bg-[#0A0C12]">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-gorange" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#8F9AA9]">
                  SQUAD TELEMETRY & ACTIVITY
                </h3>
              </div>

              {squad.activityFeed && squad.activityFeed.length > 0 ? (
                <div className="space-y-3 font-mono text-xs">
                  {squad.activityFeed.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-[#141822] last:border-none">
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="text-gorange">›</span>
                        <span>{item.text}</span>
                      </div>
                      <span className="text-[10px] text-[#556175]">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs font-mono text-[#6B7688]">No activity recorded yet. Start grinding!</div>
              )}
            </Card>
          </div>
        )}

        {/* Modal: Create Squad */}
        <AnimatePresence>
          {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#0A0C12] border border-[#2B3242] p-6 shadow-2xl relative"
              >
                <h3 className="font-display font-black text-xl text-white mb-2">
                  Initialize Squad Room
                </h3>
                <p className="text-xs text-[#8F9AA9] mb-4">
                  Set up your accountability pod. You will receive an exclusive 6-character code.
                </p>

                <form onSubmit={handleCreateSquad} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#8F9AA9] uppercase tracking-wider mb-1.5">
                      Squad Designation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Frontend Titans"
                      value={newSquadName}
                      onChange={(e) => setNewSquadName(e.target.value)}
                      className="w-full bg-[#10131A] border border-[#2B3242] text-white px-3 py-2 text-sm focus:outline-none focus:border-gorange"
                      maxLength={40}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#8F9AA9] uppercase tracking-wider mb-1.5">
                      Career Focus
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Software Engineer"
                      value={careerFocusInput}
                      onChange={(e) => setCareerFocusInput(e.target.value)}
                      className="w-full bg-[#10131A] border border-[#2B3242] text-white px-3 py-2 text-sm focus:outline-none focus:border-gorange"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowCreateModal(false)}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      variant="solar" 
                      size="sm" 
                      disabled={creating || !newSquadName.trim()}
                      className="text-xs font-bold font-mono"
                    >
                      {creating ? 'CREATING...' : 'LOCK IN SQUAD ➔'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Join Squad */}
        <AnimatePresence>
          {showJoinModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#0A0C12] border border-[#2B3242] p-6 shadow-2xl relative"
              >
                <h3 className="font-display font-black text-xl text-white mb-2">
                  Enter Squad Passcode
                </h3>
                <p className="text-xs text-[#8F9AA9] mb-4">
                  Enter the 6-character squad code provided by the squad creator.
                </p>

                <form onSubmit={handleJoinSquad} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#8F9AA9] uppercase tracking-wider mb-1.5">
                      INVITE PASSCODE
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 7B2X9A"
                      value={inviteCodeInput}
                      onChange={(e) => setInviteCodeInput(e.target.value.toUpperCase())}
                      className="w-full bg-[#10131A] border border-[#2B3242] text-white px-4 py-2 font-mono text-base uppercase tracking-widest focus:outline-none focus:border-gorange"
                      maxLength={12}
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowJoinModal(false)}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      variant="solar" 
                      size="sm" 
                      disabled={joining || !inviteCodeInput.trim()}
                      className="text-xs font-bold font-mono"
                    >
                      {joining ? 'CHECKING...' : 'ENTER ROOM ➔'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};
