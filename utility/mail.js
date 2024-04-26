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
  Admin<br />
  Muslim Match Maker
  <br />
</p>`

const proposalAccepted = ({
  senderName,
  senderId,
  recieverName,
  recieverId,
  proposalId
}) => {
  return {
    subject: 'Muslim Match Maker এ আপনার প্রস্তাবের আবস্থা পরিবর্তন হয়েছে',
    body: `আমরা আমাকে জানাতে চাইযে, আপনার <a href="${BASE_URL}/profile/proposal/${senderId}?proposalId=${proposalId}">প্রস্তাবটি</a> গ্রহন করা হয়েছে`
  }
}

const proposalRejected = ({
  senderName,
  senderId,
  recieverName,
  recieverId,
  proposalId
}) => {
  return {
    subject: 'Muslim Match Maker এ আপনার প্রস্তাবের আবস্থা পরিবর্তন হয়েছে',
    body: `আমরা আমাকে জানাতে চাইযে, আপনার <a href="${BASE_URL}/profile/proposal/${senderId}?proposalId=${proposalId}">প্রস্তাবটি</a> প্রত্যাহার করা হয়েছে`
  }
}

const proposalInitialized = ({
  senderName,
  senderId,
  recieverName,
  recieverId,
  proposalId,
  message
}) => {
  return {
    subject: 'Muslim Match Maker এ আপনি একটি প্রস্তাব পেয়েছেন',
    body: `<p>আমরা আমাকে জানাতে চাইযে, ${senderName} প্রাথমিকভাবে আপনাকে একটি <a href="${BASE_URL}/profile/proposal/${recieverId}?proposalId=${proposalId}">প্রস্তাব</a> পাঠিয়েছে</p>
    <p>তার প্রফাইল URL ${BASE_URL}/profile/${senderId}
    </p>
    ${
      message && (
        <p>
          <b>সাথে তিনি একটি বার্তা দিয়েছেন যে:</b>
          <p>${message}</p>
        </p>
      )
    }
    `
  }
}

const proposalWithdrawn = ({
  senderName,
  senderId,
  recieverName,
  recieverId,
  proposalId
}) => {
  return {
    subject: 'Muslim Match Maker এ আপনার প্রস্তাবের আবস্থা পরিবর্তন হয়েছে',
    body: `আমরা আমাকে জানাতে চাইযে, আপনার পাঠানো <a href="${BASE_URL}/profile/proposal/${senderId}?proposalId=${proposalId}">প্রস্তাবটি</a> তুলে নেওয়া হয়েছে।
    `
  }
}

const prpoposalResend = ({
  senderName,
  senderId,
  recieverName,
  recieverId,
  proposalId
}) => {
  return {
    subject: 'Muslim Match Maker এ আপনাকেও আবারও প্রস্তাবটি পাঠানো হলো',
    body: `আমরা আমাকে জানাতে চাইযে, পুর্বে যে <a href="${BASE_URL}/profile/proposal/${recieverId}?proposalId=${proposalId}">প্রস্তাবটি</a> পাঠানো হয়েছে সেটার ব্যাপারে আপনি কোন সারা দেননি।।
    `
  }
}

const codeSent = ({ recieverName, recieverId, code, reset }) => {
  return {
    subject: 'Muslim Match Maker - Verification Code',
    body: `Your ${
      reset ? 'Password Reset' : 'Verification'
    } Code For Muslim Match Maker Account is <b>${code}</b>.<p>
    This Code will expire in 5 minutes.</p>`
  }
}

const body = ({
  senderName,
  senderId,
  recieverName,
  recieverId,
  proposalId,
  status,
  message,
  code,
  reset
}) => {
  let content = ''
  console.log({ code })
  if (status === 'accepted') {
    content = proposalAccepted({
      senderName,
      senderId,
      recieverName,
      recieverId,
      proposalId
    }).body
  } else if (status === 'declined') {
    content = proposalRejected({
      senderName,
      senderId,
      recieverName,
      recieverId,
      proposalId
    }).body
  } else if (status === 'withdrawn') {
    content = proposalWithdrawn({
      senderName,
      senderId,
      recieverName,
      recieverId,
      proposalId
    }).body
  } else if (status === 'resend') {
    content = prpoposalResend({
      senderName,
      senderId,
      recieverName,
      recieverId,
      proposalId
    }).body
  } else if (status === 'codeSent') {
    content = codeSent({
      recieverName,
      recieverId,
      code,
      reset
    }).body
  } else {
    content = proposalInitialized({
      senderName,
      senderId,
      recieverName,
      recieverId,
      proposalId,
      message
    }).body
  }

  return `<p>${content}</p>`
}

const sendProposalHtml = ({
  senderName,
  senderId,
  recieverName,
  recieverId,
  proposalId,
  status,
  message,
  code,
  reset
}) => {
  console.log({ code })
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
  <p>Dear ${recieverName},</p>
  ${body({
    senderName,
    senderId,
    recieverName,
    recieverId,
    proposalId,
    status,
    message,
    code,
    reset
  })}
    ${footer}
  </div>
</body>`
}

export { sendProposalHtml }
