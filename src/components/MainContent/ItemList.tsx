import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function ItemList() {
	return (
		<div className="flex-1 overflow-scroll">
			<ul className="flex flex-col">
				<li className="flex p-2 items-center border-b-1 border-b-gray-200">
					<div className="w-20 h-auto mr-2"><img src="../../src/assets/kanta.jpeg" alt="" /></div>
					<p>Shokado</p>
					<FontAwesomeIcon className='mr-3 ml-auto bg-white' icon={faChevronRight} />
				</li>

			</ul>
		</div>);
}