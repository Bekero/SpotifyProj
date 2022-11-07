import Next from './svg/next-song-svg'
import Prev from './svg/prev-song-svg'

export const PhoneModal = ({ toggleModal, getSong, onChangeSong }) => {
    console.log('toggleModal', toggleModal);
    return (
        <div className={`phone-modal ${toggleModal ? 'open-phone-modal' : ''}`}>
            <button className='change-song-btn' disabled={getSong()?.url ? false : true} onClick={() => onChangeSong(-1)}><Prev /></button>
            <button className='change-song-btn' disabled={getSong()?.url ? false : true} onClick={() => onChangeSong(1)}><Next /></button>
            {getSong()?.title && <div className='media-title'>{getSong()?.title}</div>}

        </div>
    )
}