function sendOkResponse({ res, payload, status = 200 }) {
  return res.status(status).json(payload);
}

const sendServerError = ({ res, error }) => {
  console.error("Server Error:", error);
  res.status(500).json({ success: false, error: "Internal Server Error" });
};

module.exports = { sendOkResponse, sendServerError };
