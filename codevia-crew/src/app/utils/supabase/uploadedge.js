import {Supabase} from './client.js'
const { data, error } = await Supabase.functions.invoke('insertMediaWithURL', {
  body: { name: 'Functions' },
})