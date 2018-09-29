import React, {Component} from 'react';
import Sound from 'react-sound';
import {sounds} from './Sounds';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            sounds: sounds,
            currentSound: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.getSoundName = this.getSoundName.bind(this);
    }

    handleClick(sound) {
        this.setState({isPlaying: true, currentSound: sound});
    }

    getSoundName(sound) {
        let soundName = sound.split('.')[0].replace('_', ' ');
        return soundName.charAt(0).toUpperCase() + soundName.slice(1);
    }

    render() {
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

        return <p>Something went wrong</p>
    }
}

export default App;


