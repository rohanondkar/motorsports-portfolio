export type ProjectId =
  | 'f1-engineer-bot'
  | 'lane-vision'
  | 'blender-sim'
  | 'tablewhisper'
  | 'kitchen-link'
  | 'ratville'

export type RoomId =
  | 'engineer'
  | 'vision'
  | 'windtunnel'
  | 'briefing'
  | 'paddock'
  | null

export interface Project {
  id: ProjectId
  name: string
  blurb: string
  github: string
  room: Exclude<RoomId, null>
  radioCall: string
}

export const PROJECTS: Record<ProjectId, Project> = {
  'f1-engineer-bot': {
    id: 'f1-engineer-bot',
    name: 'F1 Engineer Bot',
    blurb:
      'AI race engineer for F1 26 — live UDP telemetry, team radio, and voice personas on the pit wall.',
    github: 'https://github.com/rohanondkar/f1-engineer-bot',
    room: 'engineer',
    radioCall: 'Box this lap. Radio check — engineer online.',
  },
  'lane-vision': {
    id: 'lane-vision',
    name: 'Lane Vision Suite',
    blurb:
      'Computer vision stack — advanced lane detection, calibration, edges, and transforms for the racing line.',
    github: 'https://github.com/rohanondkar/advanced_lane_detection',
    room: 'vision',
    radioCall: 'Eyes up. Track limits painted in pixels.',
  },
  'blender-sim': {
    id: 'blender-sim',
    name: 'Blender Sim',
    blurb: 'FIRE 298 Blender simulation work — airflow and form before the car hits asphalt.',
    github: 'https://github.com/rohanondkar/FIRE_298_Blender_Sim',
    room: 'windtunnel',
    radioCall: 'Tunnel green. Correlation check.',
  },
  tablewhisper: {
    id: 'tablewhisper',
    name: 'Tablewhisper',
    blurb:
      'Local DM console for D&D 5e — whispered rulings, party sheets, and encounter control under the lights.',
    github: 'https://github.com/rohanondkar/Tablewhisper',
    room: 'briefing',
    radioCall: 'Night session. Strategy table is live.',
  },
  'kitchen-link': {
    id: 'kitchen-link',
    name: 'Kitchen Link',
    blurb: 'Restaurants order from suppliers — paddock hospitality, but for real kitchens.',
    github: 'https://github.com/rohanondkar/kitchen-link',
    room: 'paddock',
    radioCall: 'Hospitality confirmed. Service window open.',
  },
  ratville: {
    id: 'ratville',
    name: 'Ratville Onboarding',
    blurb: 'Onboarding bot for new team arrivals — paddock welcome, not the wall of PDFs.',
    github: 'https://github.com/rohanondkar/Ratville-Onboarding-Bot',
    room: 'paddock',
    radioCall: 'New hire to garage. Badge them in.',
  },
}

export const PROFILE = {
  name: 'Rohan Ondkar',
  handle: 'rohanondkar',
  github: 'https://github.com/rohanondkar',
  tagline: 'Builder. Engineer. Motorsport nerd.',
  about:
    'I build software the way a race weekend unfolds — telemetry, vision, simulation, and radio. From F1 2008 to Garage 56, WEC endurance, Indy, DTM, Super GT, rally, and Dakar: the grid is the inspiration, the repos are the cars.',
}
