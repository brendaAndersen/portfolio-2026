import growlympics from '@/assets/projects/growlympics_01.png'
import growlympics2 from '@/assets/projects/growlympics_02.png'
import time from '@/assets/projects/time_01.png'
import time2 from '@/assets/projects/time_02.png'
import portfolio from '@/assets/projects/portfolio_01.png'
import devlife from '@/assets/projects/devlife_01.png'

export type Project = {
  id: number
  slug: string
  title: string
  description: string
  image: string
  images?: string[]
  techs: string[]
  link: string
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'growlympics',
    title: 'Growlympics',
    description:
      'Uma plataforma com o intuito de promover o plantio de plantas: registra-se o local e tipo de planta.',
    image: growlympics2,
    images: [growlympics],
    techs: ['Next.js', 'Typescript', 'Tailwind', 'Radix UI'],
    link: 'https://github.com/brendaAndersen/growlympics',
  },
  {
    id: 2,
    slug: 'dev-life',
    title: 'Dev Life',
    description:
      'Painel administrativo para gerenciar sua vida dev. Pode-se cadastrar seus atuais estudos e questões de saúde.',
    image: devlife,
    techs: ['Laravel', 'Tailwind CSS', 'Vite'],
    link: 'https://github.com/brendaAndersen/dev-life',
  },
  {
    id: 3,
    slug: 'bot-de-automacao',
    title: 'Bot de Automação',
    description:
      'Sistema inteligente de bots focado em extração de dados do sistema. Sendo possível comunicar-se com ele através do WhatsApp.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
    techs: ['Laravel', 'API WhatsApp'],
    link: '#',
  },
  {
    id: 4,
    slug: 'tasks-manager',
    title: 'Tasks Manager',
    description: 'Um sistema de gerenciamento tarefas com roles de usuário.',
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200',
    techs: ['Next.js', 'FastAPI', 'Tailwind v4', 'SQLite', 'Autenticação JWT'],
    link: 'https://github.com/brendaAndersen/afl-tasks',
  },
  {
    id: 5,
    slug: 'sistema-de-ponto',
    title: 'Sistema de Ponto',
    description:
      'Um sistema de gerenciamento de ponto. Com Next como Front e Backend: CRUD de usuários e pontos, download dos pontos com Excel e PDF.',
    image: time,
    images: [time2],
    techs: ['Next.js', 'PostgreSQL', 'Tailwind v4'],
    link: 'https://github.com/brendaAndersen/time-tracking-system',
  },
  {
    id: 6,
    slug: 'portfolio',
    title: 'Portfolio',
    description: 'Este portfólio utilizando conceitos modernos de design e estilização avançada.',
    image: portfolio,
    techs: ['Vue 3', 'Tailwind v4'],
    link: 'https://github.com/brendaAndersen/portfolio-2026',
  },
]

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug)
