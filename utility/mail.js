import BASE_URL from '@/config'

const nav = ` <div
style="
  font-weight: bold;
  padding: 10px;
  background: rgba(20, 148, 191, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
"
>
<div style="font-size: 150%; color: green">Muslim</div>
<div style="font-size: 80%; margin-left: 15px">
  <span style="color: goldenrod">Match </span><span>Maker</span>
</div>
</div>`

const footer = ` <p>JazakAllahu Khairan.</p>
<p>Warm regards,</p>
<p>
  [Your Name]<br />[Your Position/Title]<br />[Your Contact
  Information]<br />[Islamic Matrimony Site Name]
</p>`
const sendProposalHtml = ({ senderName, senderId }) => {
  return ` <body
  style="
  background: linear-gradient(
    45deg,
    rgba(0, 126, 236, 0.3),
    rgb(255, 255, 255, 0.3),
    rgba(0, 126, 236, 0.3)
  );
    font-family: 'Ubuntu', sans-serif;
    min-height: 90vh;
    margin: 0;
  "
>
  ${nav}
  <div style="padding: 10px; background-color: rgb(0, 125, 0, 0.1);
  min-height: 85vh;">
  <p>Assalamu Alaikum Warahmatullahi Wabarakatuhu,</p>
  <p>
    ${senderName} is interested in connecting with you on Muslim Match
    Maker. he have sent a proposal for marriage according to Islamic
    principles.
  </p>
  <p>
  <a
  href="
${BASE_URL}/profile/${senderId}
"
  >Review ${senderName}'s profile </a
>and respond via our platform if
    interested.
  </p>
  <P>May Allah guide you in your decision.</P>
    ${footer}
  </div>
</body>`
}

export { sendProposalHtml }
