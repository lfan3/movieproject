import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/Spinner.css'


library.add(faSpinner);

const Spinner = ()=>{
	return(
			<FontAwesomeIcon 
				icon="spinner"
				pulse
				size='7x'
				className='fa-faSpinner'
			/>
		)
}



export {Spinner}
