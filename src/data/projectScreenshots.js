// ===================================================================
//  Project Screenshots Configuration & Asset Mapping
//
//  To add screenshots for a project:
//  1. Drop the image file into: /public/project_photo/<folder-name>/
//  2. Add the filename (or an object with caption) to the project's array below!
// ===================================================================

export const projectScreenshotsConfig = {
  // GitOps-Based Kubernetes Deployment with Argo CD
  'argo-cd': {
    folder: 'argo-cd',
    title: 'GitOps-Based Kubernetes Deployment with Argo CD',
    images: [
      {
        file: 'Screenshot 2026-09-01 151430.png',
        title: 'Argo CD Applications Dashboard',
        caption: 'Argo CD UI visualizing synced Kubernetes application manifests and cluster state.',
      },
      {
        file: 'Screenshot 2026-09-01 151817.png',
        title: 'Cluster Resource Topology & Sync Status',
        caption: 'Detailed live synchronization status, pods, services, and health metrics.',
      },
      {
        file: 'Screenshot 2026-09-01 151840.png',
        title: 'Deployment & Pod Tree Health',
        caption: 'Pod tree visualization displaying replica sets and automated self-healing.',
      },
      {
        file: 'Screenshot 2026-09-01 151900.png',
        title: 'GitOps Automated Drift Detection',
        caption: 'Automated drift detection and Git sync history log.',
      },
    ],
  },

  // AgriSL — AI Farming Platform
  'agrisl': {
    folder: 'agrisl',
    title: 'AgriSL — AI Farming Platform',
    images: [
      // Add screenshot filenames here, e.g.:
      // 'dashboard.png',
      // { file: 'crop-detection.png', title: 'Disease Detection UI', caption: 'AI classification interface' }
    ],
  },

  // Hotel Menu Manager
  'hotel-menu-manager': {
    folder: 'hotel-menu-manager',
    title: 'Hotel Menu Manager',
    images: [
      // Add screenshot filenames here, e.g.:
      // 'menu-admin.png'
    ],
  },

  // TourMateAI — AI Travel Planner
  'tourmateai': {
    folder: 'tourmateai',
    title: 'TourMateAI — AI Travel Planner',
    images: [
      {
        file: 'Screenshot 2026-07-21 201630.png',
        title: 'TourMateAI Landing & Smart Assistant',
        caption: 'Modern landing portal highlighting AI travel planning, real-time weather integration, and landmark recognition across Sri Lanka.',
      },
      {
        file: 'Screenshot 2026-07-21 202007.png',
        title: 'Destination Discovery & Mood Filter',
        caption: 'Interactive attraction search and category filtering across heritage sites, crescent beaches, hiking trails, and cultural landmarks.',
      },
      {
        file: 'Screenshot 2026-07-21 202231.png',
        title: 'Attraction Details & Live Weather Forecast',
        caption: 'Detailed destination overview featuring real-time weather conditions, GPS coordinates, and traveler community reviews.',
      },
      {
        file: 'Screenshot 2026-08-27 124916.png',
        title: 'AI Multi-Day Itinerary Builder',
        caption: 'Automated itinerary generator scheduling personalized day-by-day routes, custom stops, and transit times.',
      },
      {
        file: 'Screenshot 2026-08-26 172431.png',
        title: 'AI Landmark Recognition (Sigiriya Rock Fortress)',
        caption: 'Computer Vision ML model detecting historical landmarks from user photos with high confidence accuracy.',
      },
      {
        file: 'Screenshot 2026-08-28 131514.png',
        title: 'Landmark Photo Upload & Identification History',
        caption: 'Image upload portal supporting drag-and-drop inference alongside historical landmark identification logs.',
      },
      {
        file: 'Screenshot 2026-08-26 173413.png',
        title: 'Spatial & Nearby Destination Recommendations',
        caption: 'Intelligent geolocation engine recommending nearby attractions, wildlife parks, and cultural highlights.',
      },
      {
        file: 'Screenshot 2026-07-21 202527.png',
        title: 'Admin Operations & Attraction Management',
        caption: 'Centralized administrative portal managing attraction databases, coordinates, user profiles, and itineraries.',
      },
      {
        file: 'Screenshot 2026-07-21 201744.png',
        title: 'Secure User Authentication (Firebase Auth)',
        caption: 'User login and session management interface integrated with Firebase Authentication.',
      },
    ],
  },

  // Cloud-Native Web Application Platform
  'cloud-native-platform': {
    folder: 'cloud-native-platform',
    title: 'Cloud-Native Web Application Platform',
    images: [],
  },
};

/**
 * Normalizes an image entry (string or object) into a standardized screenshot object.
 */
function normalizeImage(entry, folder, projectTitle, index) {
  if (typeof entry === 'string') {
    return {
      src: `/project_photo/${folder}/${entry}`,
      thumbnail: `/project_photo/${folder}/${entry}`,
      title: `${projectTitle} - Screenshot ${index + 1}`,
      caption: '',
      alt: `${projectTitle} screenshot ${index + 1}`,
      filename: entry,
    };
  }

  const filename = entry.file || entry.src;
  const src = filename.startsWith('/') ? filename : `/project_photo/${folder}/${filename}`;

  return {
    src,
    thumbnail: entry.thumbnail ? (entry.thumbnail.startsWith('/') ? entry.thumbnail : `/project_photo/${folder}/${entry.thumbnail}`) : src,
    title: entry.title || `${projectTitle} - Screenshot ${index + 1}`,
    caption: entry.caption || '',
    alt: entry.alt || entry.title || `${projectTitle} screenshot ${index + 1}`,
    filename,
  };
}

/**
 * Get all screenshots for a project by its id (or slug/title match).
 * Returns an array of normalized screenshot objects.
 */
export function getProjectScreenshots(projectId) {
  if (!projectId) return [];

  // Direct ID lookup
  let config = projectScreenshotsConfig[projectId];

  // Fallback: search by folder or normalized title match
  if (!config) {
    const key = Object.keys(projectScreenshotsConfig).find(
      (k) =>
        k.toLowerCase() === projectId.toLowerCase() ||
        projectScreenshotsConfig[k].title.toLowerCase() === projectId.toLowerCase()
    );
    if (key) config = projectScreenshotsConfig[key];
  }

  if (!config || !Array.isArray(config.images)) return [];

  const folder = config.folder || projectId;
  const title = config.title || projectId;

  return config.images
    .filter(Boolean)
    .map((img, idx) => normalizeImage(img, folder, title, idx));
}

/**
 * Check if a project has any screenshots available.
 */
export function hasScreenshots(projectId) {
  const screenshots = getProjectScreenshots(projectId);
  return screenshots.length > 0;
}

/**
 * Get total number of screenshots for a project.
 */
export function getScreenshotCount(projectId) {
  return getProjectScreenshots(projectId).length;
}
