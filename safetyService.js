const RESTRICTED_PATTERNS = [
  /bomb|explosive|weapon|weaponry/i,
  /hack|crack|bypass|malware|virus/i,
  /kill|suicide|violence|attack/i,
  /illegal|drugs|contraband/i
];

export const validateSafety = (query) => {
  for (const pattern of RESTRICTED_PATTERNS) {
    if (pattern.test(query)) {
      return {
        safe: false,
        reason: "सुरक्षा कारणों से, 'OS Brain' गैर-कानूनी, हिंसक या नुकसानदेह सवालों का जवाब नहीं दे सकता।"
      };
    }
  }
  return { safe: true };
};
