import Styled from 'styled-components'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const RedButton = Styled(Button)`
background: 'rgba(220, 53, 69, ${props => props.opacity || 1.0})'
`

RedButton.propTypes = {
    opacity: PropTypes.number,
}