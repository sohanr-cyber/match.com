import Image from 'next/image'
import React from 'react'

const Icon = ({ allowed, image, handleClick, title }) => {
  return (
    <span
      onClick={() => allowed && handleClick()}
      style={{
        padding: '10px 5px',
        borderRadius: '5px',
        background: 'rgb(0, 0 , 0 ,0.1)',
        border: '1px solid black',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: '100px',
        minwidth: '100px',
        cursor: `${allowed ? 'pointer' : 'not-allowed'}`,
        fontWeight: 'bold',
        gap: '10px',
        aspectRatio: '1/1'
      }}
    >
      <Image src={image} width={'50'} height={'50'} alt='Icon' />
      <span>{title}</span>
    </span>
  )
}

export default Icon
