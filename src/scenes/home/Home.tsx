import s from './Home.module.scss'
import ImageCheck from '../../components/imageCheck/ImageCheck'
const Home = () =>{
    return(
        <>
        <div className={s.container_home}>
            <h1 className={s.preview_h1}>Check Gender</h1>
            <ImageCheck />
        </div>
        </>
    )
}

export default Home
