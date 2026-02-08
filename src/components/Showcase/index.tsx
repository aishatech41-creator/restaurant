import React from 'react'
import Left from './left'
import Right from './right'


const Showcase = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full min-h-[calc(100vh-80px)] pt-24 md:pt-16 px-4 md:px-16 items-center' id='home'>
      <Left />
      <Right />
    </section>
  )
}

export default Showcase