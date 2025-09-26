function base64url(obj){
  return btoa(JSON.stringify(obj)).replace(/=+$/,'').replace(/\+/g,'-').replace(/\//g,'_')
}

export function loginMock(email, password){
  const role = email.includes('trainer') ? 'trainer' : 'trainee'
  const payload = { sub: role === 'trainer' ? 1 : 2, email, role }
  return `${base64url({alg:'none',typ:'JWT'})}.${base64url(payload)}.`
}

export function parseJwt(token){
  const parts = token.split('.')
  if (parts.length < 2) return {}
  const json = atob(parts[1].replace(/-/g,'+').replace(/_/g,'/'))
  return JSON.parse(json)
}

export const mock = {
  trainees: [
    { id: 2, full_name: 'Anna Azubi', email: 'azubi@example.com' },
    { id: 3, full_name: 'Ben Beruf', email: 'ben@example.com' },
  ],
  tasksByUser: {
    2: [ { id: 1, title: 'Berichtsheft KW40', status: 'open', progress: 0 } ],
    3: [ { id: 2, title: 'Projekt Doku', status: 'in_progress', progress: 40 } ],
  },
  events: [
    { id: 1, title: 'Berufsschule', start: '2025-10-01T08:00:00', end: '2025-10-01T15:00:00' },
  ],
}
