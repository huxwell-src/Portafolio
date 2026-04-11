// Mock global del servicio — importar en cada test que lo necesite
export const mockJobs = [
  {
    id: 1,
    company: 'Globant',
    position: 'Senior Frontend Developer',
    industry: 'Fintech',
    status: 'interview',
    applied_date: '2024-03-01',
    job_url: 'https://globant.com/jobs/123',
    notes: [],
    history: [
      { from_status: null, to_status: 'applied', changed_at: '2024-03-01T10:00:00Z' },
      { from_status: 'applied', to_status: 'interview', changed_at: '2024-03-05T14:00:00Z' }
    ]
  },
  {
    id: 2,
    company: 'Mercado Libre',
    position: 'Backend Engineer',
    industry: 'Ecommerce',
    status: 'applied',
    applied_date: '2024-03-10',
    job_url: '',
    notes: [],
    history: [
      { from_status: null, to_status: 'applied', changed_at: '2024-03-10T09:00:00Z' }
    ]
  }
];

export const mockStats = {
  total: 2,
  by_status: {
    applied: 1, interview: 1, technical: 0,
    offer: 0, rejected: 0, discarded: 0
  },
  response_rate: 50.0,
  offer_rate: 0.0,
  applied_last_7_days: 1,
  applied_last_30_days: 2,
  avg_days_to_response: 4.0
};

export const mockPredict = {
  job_id: 1,
  company: 'Globant',
  current_status: 'interview',
  score: 70,
  label: 'Buenas chances',
  tips: ['Tienes notas registradas', 'La empresa ha respondido bien antes']
};
