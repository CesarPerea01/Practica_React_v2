import { useState } from 'react'
export function TwitterFollowCard({userName, name, initialisFollowing}){
    const [isFollowing, setIsFollowing] = useState(initialisFollowing)


    const text = isFollowing ? 'Siguiendo': 'Seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following': 'tw-followCard-button'

    const handleClick = ()=>{
        setIsFollowing(!isFollowing)
    }
    return(
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img className='tw-followCard-img' 
                src={`https://unavatar.io/${userName}` }
                alt="avatar" />
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    <span className='tw-followCard-infoUser'>@{userName}</span>
                </div>
            </header>
    
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className='twitter-followCard-text'>{text}</span>
                    <span className='twitter-followCard-stopFollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>
        )
}