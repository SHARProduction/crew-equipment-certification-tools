export const evaluators={
  'crew-credential-expiry-tracker': i=>{const shoot=Date.parse(i.shootDate),warn=Number(i.warningDays),rows=(i.credentials||[]).map(x=>{const days=Math.floor((Date.parse(x.expires)-shoot)/864e5);return{...x,daysAfterShoot:days,status:days<0?'expired':days<=warn?'warning':'valid'}});return{valid:Number.isFinite(shoot)&&rows.length>0,rows,blocked:rows.filter(x=>x.status==='expired').map(x=>x.person)}},
  'equipment-certification-validator': i=>{const date=Date.parse(i.date),rows=(i.required||[]).map(eq=>{const c=(i.certificates||[]).find(x=>x.equipment===eq);return{equipment:eq,valid:Boolean(c?.issuer&&Date.parse(c.expires)>=date)}});return{valid:rows.length>0&&rows.every(x=>x.valid),rows}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
