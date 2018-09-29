import React, {Component} from 'react';
import axios from 'axios';
import Sound from 'react-sound';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,
            isPlaying: false,
            sounds: null,
            currentSound: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.getSoundName = this.getSoundName.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        axios.get("data/sounds.json")
            .then(result => this.setState({sounds: result.data, isLoading: false}))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    handleClick(sound) {
        this.setState({isPlaying: true, currentSound: sound});
    }

    getSoundName(sound) {
        let soundName = sound.split('.')[0].replace('_', ' ');
        return soundName.charAt(0).toUpperCase() + soundName.slice(1);
    }

    render() {
        if (this.state.error) {
            return <p>{this.state.error.message}</p>;
        }

        if (this.state.isLoading) {
            return <p>Loading ...</p>;
        }

        if (this.state.sounds) {
            return (
                <div className="App">
                    {this.state.isPlaying && (
                        <Sound url={this.state.currentSound} playStatus={Sound.status.PLAYING}/>
                    )}
                    <div className="Container">
                        <img className="Logo" src="logo.png" alt="Peepoodo and the super fuck friends"/>
                        <div className="TileList">
                            {Object.keys(this.state.sounds).map((char) => (
                                this.state.sounds[char].map((sound) => (
                                    <div className="TileWrapper" key={char + "_" + sound}>
                                        <div className="Tile">
                                            <div className="Button"
                                                 onClick={() => this.handleClick("sounds/" + char + "_" + sound)}>
                                                <img className="Avatar" src={"avatars/" + char + ".png"} alt={char}/>
                                                <div className="SoundName">{this.getSoundName(sound)}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        return <p>Nothing to see here</p>
    }
}

export default App;


