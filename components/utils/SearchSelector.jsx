import React, { useState } from 'react'
import styles from '../../styles/Selector.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const SearchSelector = ({ options }) => {
  console.log({ options })
  const [query, setQuery] = useState('')

  const filteredOptions = options.filter(i =>
    i.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className={styles.wrapper}>
      <input onChange={e => setQuery(e.target.value)} />

      <div className={styles.items}>
        {filteredOptions.map((item, index) => (
          <div className={styles.option} key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchSelector
