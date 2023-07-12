import Header from './Header';
import '../css/project.css'

function Project() {
    return (
        <div id='main'>
            <Header/>
            <div id="down">
                <div className="container">
                    <div className="wrap">
                        <input
                            className='slider'
                            type="range"
                            min={0}
                            max={1}
                            color="gray"
                            step={0.02}
                            // value={volume}
                            // onChange={(event) => {
                            //     setVolume(event.target.valueAsNumber);
                            // }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Project;