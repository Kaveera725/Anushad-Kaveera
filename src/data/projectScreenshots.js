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
      // Add screenshot filenames here, e.g.:
      // 'itinerary-planner.png'
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
