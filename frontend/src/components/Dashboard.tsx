import { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { motion } from 'framer-motion'
import { supabase } from '../supabaseClient'
import './Dashboard.css'

interface Stat {
  day: string
  value: number
}

const healthData: Stat[] = [
  { day: 'Mon', value: 5 },
  { day: 'Tue', value: 7 },
  { day: 'Wed', value: 6 },
  { day: 'Thu', value: 8 },
  { day: 'Fri', value: 4 },
  { day: 'Sat', value: 9 },
  { day: 'Sun', value: 6 }
]

const financeData: Stat[] = [
  { day: 'Jan', value: 200 },
  { day: 'Feb', value: 150 },
  { day: 'Mar', value: 220 },
  { day: 'Apr', value: 280 },
  { day: 'May', value: 260 }
]

export default function Dashboard() {
  const [tasks, setTasks] = useState<string[]>([])
  const [shopping] = useState<string[]>(['Milk', 'Eggs', 'Bread'])
  const [chores] = useState<string[]>(['Laundry', 'Dishes'])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await supabase
          .from<{ title: string }>('tasks')
          .select('title')
        setTasks(data?.map((t) => t.title) || [])
      } catch (e) {
        console.error('Supabase error', e)
      }
    }
    fetchTasks()
  }, [])

  return (
    <div className="dashboard">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Family Dashboard
      </motion.h1>

      <div className="stats-grid">
        <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
          <h2>Health</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
          <h2>Economy</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={financeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="lists">
        <motion.div className="list-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>Tasks</h3>
          <ul>
            {tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="list-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>Shopping List</h3>
          <ul>
            {shopping.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="list-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3>Chores</h3>
          <ul>
            {chores.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

