import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router"

const base = Component => props => {

  const history = useHistory()
  const auth = useSelector(state => state.authorized)

  useEffect(() => {
    if (!auth)
      history.push("/login")
    else
      history.push('/')
  }, [auth, history])

  return (
    <>
      <Component />
    </>
  );
}

export default base