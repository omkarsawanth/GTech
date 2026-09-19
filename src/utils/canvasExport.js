/**
 * Shared Canvas Export Pipeline
 * Provides unified, reusable canvas-to-PNG generation for ShareProgressModal, RoastCard, and Squad invites.
 */

/**
 * Downloads a canvas as a PNG file.
 */
export const downloadCanvas = (canvas, filename = 'kalpa-export.png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

/**
 * Renders a base dark obsidian cyber-themed canvas with corners and branding.
 */
export const createBaseCanvas = (width = 1200, height = 630) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base dark gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#07080D');
  bgGrad.addColorStop(0.5, '#0B0D14');
  bgGrad.addColorStop(1, '#07080D');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Ambient glows
  const glow1 = ctx.createRadialGradient(250, 150, 10, 250, 150, 420);
  glow1.addColorStop(0, 'rgba(255, 51, 102, 0.22)');
  glow1.addColorStop(1, 'rgba(255, 51, 102, 0)');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, width, height);

  const glow2 = ctx.createRadialGradient(950, 480, 10, 950, 480, 450);
  glow2.addColorStop(0, 'rgba(255, 138, 0, 0.20)');
  glow2.addColorStop(1, 'rgba(255, 138, 0, 0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, width, height);

  // Outer Cyber Frame
  ctx.strokeStyle = '#1E232F';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Corner Tech Accents
  ctx.fillStyle = '#FF3366';
  ctx.fillRect(26, 26, 24, 4);
  ctx.fillRect(26, 26, 4, 24);
  ctx.fillRect(width - 50, 26, 24, 4);
  ctx.fillRect(width - 30, 26, 4, 24);
  ctx.fillRect(26, height - 30, 24, 4);
  ctx.fillRect(26, height - 50, 4, 24);
  ctx.fillRect(width - 50, height - 30, 24, 4);
  ctx.fillRect(width - 30, height - 50, 4, 24);

  // Footer Watermark
  ctx.font = '13px monospace';
  ctx.fillStyle = '#64748B';
  ctx.fillText('VERIFIED VIA KALPA PLATFORM  •  POWERED BY GEMINI 3.6 FLASH  •  KALPA.AI', 80, height - 55);

  return { canvas, ctx, width, height };
};

/**
 * Text wrapping utility for HTML5 canvas.
 */
export const wrapCanvasText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
};

/**
 * Renders and exports a Skill Roast PNG card.
 */
export const exportRoastCardPNG = ({
  roast,
  punchline,
  burnRating = 4,
  targetRole = 'Software Engineer',
}) => {
  const { canvas, ctx, width } = createBaseCanvas(1200, 630);

  // Top Subheader
  ctx.font = 'bold 34px sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('KALPA', 80, 88);

  ctx.font = '13px monospace';
  ctx.fillStyle = '#FF3366';
  ctx.fillText('AI SKILL ROAST  //  SAVAGE EVALUATION', 220, 82);

  ctx.fillStyle = '#8F9AA9';
  ctx.fillText(`ROLE: ${targetRole.toUpperCase()}`, 80, 130);

  // Burn Rating Pill
  const flames = '🔥'.repeat(Math.min(5, Math.max(1, burnRating)));
  ctx.font = 'bold 14px monospace';
  ctx.fillStyle = '#FF8A00';
  ctx.fillText(`BURN RATING: ${flames} (${burnRating}/5)`, width - 360, 130);

  // Roast Bubble Box
  const boxX = 80;
  const boxY = 160;
  const boxW = 1040;
  const boxH = 370;

  ctx.fillStyle = 'rgba(11, 13, 20, 0.85)';
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.strokeStyle = '#283042';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  // Orange Left Accent Stripe
  ctx.fillStyle = '#FF8A00';
  ctx.fillRect(boxX, boxY, 6, boxH);

  // Roast Body Text
  ctx.font = '28px sans-serif';
  ctx.fillStyle = '#E2E8F0';
  const endY = wrapCanvasText(ctx, roast, boxX + 45, boxY + 70, boxW - 90, 44);

  // Punchline Highlight Box
  if (punchline) {
    const punchY = Math.max(endY + 20, boxY + 240);
    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = '#FF8A00';
    ctx.fillText(`> "${punchline}"`, boxX + 45, punchY);
  }

  // Trigger download
  const safeTitle = targetRole.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  downloadCanvas(canvas, `kalpa-roast-${safeTitle}.png`);
  return canvas;
};

/**
 * Renders and exports a Squad Invite PNG card.
 * Respects privacy rules: only opted-in handles or anonymous member monikers.
 */
export const exportSquadInvitePNG = ({
  squadName = 'Alpha Engineers',
  inviteCode = 'KLP-8A',
  careerFocus = 'Software Engineer',
  membersCount = 2,
  maxMembers = 5,
  spotsRemaining = 3,
}) => {
  const { canvas, ctx, width, height } = createBaseCanvas(1200, 630);

  // Brand header
  ctx.font = 'bold 36px sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('KALPA', 80, 88);

  ctx.font = '13px monospace';
  ctx.fillStyle = '#FF3366';
  ctx.fillText('SQUAD ROOM INVITE  //  RESTRICTED ACCESS', 224, 82);

  ctx.fillStyle = '#8F9AA9';
  ctx.fillText(`COHORT FOCUS: ${careerFocus.toUpperCase()}`, 80, 126);

  // Scarcity alert badge
  const scarcityText = spotsRemaining <= 1 
    ? 'ONLY 1 SPOT REMAINING — FINAL CALL' 
    : `ROOM IS LOCKED TO ${maxMembers} CANDIDATES — ${spotsRemaining} SLOTS OPEN`;
  ctx.font = 'bold 13px monospace';
  ctx.fillStyle = '#FF8A00';
  ctx.fillText(scarcityText, width - 480, 126);

  // Main Invite Box
  const boxX = 80;
  const boxY = 160;
  const boxW = 1040;
  const boxH = 370;

  ctx.fillStyle = 'rgba(11, 13, 20, 0.90)';
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.strokeStyle = '#283042';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  // Violet/Coral Left Accent Stripe
  const stripeGrad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxH);
  stripeGrad.addColorStop(0, '#FF3366');
  stripeGrad.addColorStop(1, '#8B5CF6');
  ctx.fillStyle = stripeGrad;
  ctx.fillRect(boxX, boxY, 6, boxH);

  // Squad Title
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(squadName, boxX + 45, boxY + 65);

  ctx.font = '15px sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(`Sprint peer group preparing for ${careerFocus} roles. Daily streak tracking enabled.`, boxX + 45, boxY + 105);

  // Invite Code Showcase Box
  const codeBoxX = boxX + 45;
  const codeBoxY = boxY + 140;
  const codeBoxW = 460;
  const codeBoxH = 120;

  ctx.fillStyle = 'rgba(20, 24, 34, 0.95)';
  ctx.fillRect(codeBoxX, codeBoxY, codeBoxW, codeBoxH);
  ctx.strokeStyle = '#FF8A00';
  ctx.lineWidth = 2;
  ctx.strokeRect(codeBoxX, codeBoxY, codeBoxW, codeBoxH);

  ctx.font = '12px monospace';
  ctx.fillStyle = '#8F9AA9';
  ctx.fillText('SECRET PASSCODE / INVITE CODE', codeBoxX + 24, codeBoxY + 36);

  ctx.font = 'bold 42px monospace';
  ctx.fillStyle = '#FF8A00';
  ctx.fillText(inviteCode, codeBoxX + 24, codeBoxY + 88);

  // Scarcity & Join Instructions right column
  const instX = boxX + 540;
  const instY = boxY + 160;
  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('HOW TO JOIN:', instX, instY);

  ctx.font = '15px sans-serif';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('1. Go to kalpa.ai/onboarding', instX, instY + 32);
  ctx.fillText('2. Or open Squad Rooms in your Kalpa Dashboard', instX, instY + 62);
  ctx.fillText(`3. Enter passcode: ${inviteCode}`, instX, instY + 92);

  // Member count pill
  ctx.font = 'bold 14px monospace';
  ctx.fillStyle = '#38BDF8';
  ctx.fillText(`STATUS: ${membersCount}/${maxMembers} MEMBERS LOCKED IN`, boxX + 45, boxY + 310);

  // Trigger download
  const safeName = squadName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  downloadCanvas(canvas, `kalpa-squad-${safeName}.png`);
  return canvas;
};

