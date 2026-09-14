const username = 'NDHBBCYED';
export const fallbackProjects = [
  { id: 'cotizacion', name: 'Sistema-de-cotizacion', description: 'Sistema de cotización.', language: 'TypeScript', url: 'https://github.com/NDHBBCYED/Sistema-de-cotizacion', demo: '', tags: ['TypeScript', 'JavaScript'], updated: 'GitHub' },
  { id: 'portfolio', name: 'portafolio-Francisco-Clemente', description: 'Portafolio personal.', language: 'CSS', url: 'https://github.com/NDHBBCYED/portafolio-Francisco-Clemente', demo: '', tags: ['CSS', 'Front-End'], updated: 'GitHub' },
  { id: 'cafeteria', name: 'cafeteria-creativa1', description: 'Proyecto web de cafetería.', language: 'CSS', url: 'https://github.com/NDHBBCYED/cafeteria-creativa1', demo: '', tags: ['CSS', 'Front-End'], updated: 'GitHub' },
  { id: 'frontend', name: 'mini-proyecto-de-frontend', description: 'Mini proyecto de desarrollo front-end.', language: 'CSS', url: 'https://github.com/NDHBBCYED/mini-proyecto-de-frontend', demo: '', tags: ['CSS', 'Front-End'], updated: 'GitHub' },
  { id: 'univoxu', name: 'tienda-de-UniVoxu', description: 'Proyecto de tienda web.', language: 'JavaScript', url: 'https://github.com/NDHBBCYED/tienda-de-UniVoxu', demo: '', tags: ['JavaScript', 'Front-End'], updated: 'GitHub' },
  { id: 'coffee', name: 'coffeemachine', description: 'Proyecto desarrollado en C#.', language: 'C#', url: 'https://github.com/NDHBBCYED/coffeemachine', demo: '', tags: ['C#', 'Otros'], updated: 'GitHub' },
];
export async function getProjects() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { signal: controller.signal });
    if (!response.ok) throw new Error('No fue posible cargar los repositorios');
    const repos = await response.json();
    const projects = repos.filter((repo) => !repo.fork).slice(0, 9).map((repo) => ({
    id: repo.id, name: repo.name, description: repo.description || 'Proyecto disponible en GitHub.',
    language: repo.language || 'Otros', url: repo.html_url, demo: repo.homepage,
    tags: [repo.language || 'Otros', ...(repo.topics || [])], updated: new Intl.DateTimeFormat('es', { month: 'short', year: 'numeric' }).format(new Date(repo.updated_at)),
    }));
    return projects.length ? projects : fallbackProjects;
  } catch { return fallbackProjects; } finally { clearTimeout(timeout); }
}
