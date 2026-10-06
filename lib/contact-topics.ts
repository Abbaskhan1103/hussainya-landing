// `category` must be one the app's feedback table accepts
// (bug | suggestion | praise | other); the exact topic is kept in metadata.
export const CONTACT_TOPICS = [
  { value: "general", label: "General", category: "other" },
  { value: "centre_manager", label: "Centre Manager", category: "other" },
  { value: "centre_listing", label: "Centre Listing", category: "other" },
  { value: "app_issue", label: "App Issue", category: "bug" },
  { value: "feature_request", label: "Feature Request", category: "suggestion" },
  { value: "privacy", label: "Privacy", category: "other" },
  { value: "partnerships", label: "Partnerships", category: "other" },
] as const;
