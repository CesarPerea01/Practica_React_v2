import './App.css'
import './TwitterFollowCard.jsx'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [{
    userName: 'kikobeats',
    name: 'kikoelbueno',
    initialisFollowing: true
},
{
    userName: 'pheralb',
    name: 'Pablo Hernandez',
    initialisFollowing: true
},
{
    userName: 'perrosanche',
    name: 'Pedro Sanchez',
    initialisFollowing: false
}]

export function App (){
return(
    <section className='App'> 
     {
        users.map(user=>{
            const {userName, name, initialisFollowing} = user
            return(
                <TwitterFollowCard
                    key={userName}
                    userName={userName}
                    name={name}
                    initialisFollowing={initialisFollowing}
                ></TwitterFollowCard>
            )
        })
     }
    </section>
)
}