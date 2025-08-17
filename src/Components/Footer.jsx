import React from 'react'
import { Calendar } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='bottom-0 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[10vw] w-full bg-blue-400 text-white mt-10'>
        <div id="footer-left">
            <div className='h-6 w-6 rounded-sm'>k cha</div>
            <div></div>
        </div>
        <div id="footer-center"></div>
        <div id="footer-right"></div>

    </footer>
  )
}
