import Dropzone from 'react-dropzone';
import axios from 'axios';
import classes from '../../helpers/Button/Button.module.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

import React, {Component} from 'react';
import StyledButton from "../Button/Button";

class FileUpload extends Component {
    state = {
        uploadedFiles: [],
        uploading: false,
    };

    onDrop = (files) => {
        this.setState({uploading: true});
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]);

        axios.post('/api/users/uploadimage', formData, config)
            .then(res => {
                this.setState({
                    uploading: false,
                    uploadedFiles: [
                        ...this.state.uploadedFiles,
                        res.data
                    ]
                }, () => {console.log(this.state.uploadedFiles); this.props.imageHandler(this.state.uploadedFiles)})
            } )
    };
    showUploadedImages = () => (
        this.state.uploadedFiles.map(item => (
            <div
                key={item.public_id}
                onClick={() => this.onRemove(item.public_id)}
            >
                <div className="wrap" style={{
                    background: `url(${item.url}) no-repeat`,
                    height: '100px',
                    width: '100px'
                }}>
                </div>
            </div>
        ))
    );

    onRemove = (id) => {
        axios.get(`/api/users/removeimage?public_id=${id}`)
            .then(res => {
                let images = this.state.uploadedFiles.filter((item) =>{
                    return item.public_id !== id;
                });
                this.setState({
                    uploadedFiles: images
                }, () => {
                    this.props.imageHandler(images);
                })
            })
    };

    static getDerivedStateFromProps(props, state) {
        if(props.reset){
            return state = {
                uploadedFiles: []
            }
        }
        return null;
    }

    render() {
        return (
            <div style={{
                textAlign: 'center'
            }}>
                <div>
                    <Dropzone onDrop={this.onDrop} multiple={false} style={{
                        width: '80%',
                        height: '5vh',
                        margin: 'auto',
                    }}>
                        <div className={classes.btn}> Upload files here</div>
                    </Dropzone>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '15px auto',
                    flexWrap: 'wrap'
                }}>
                {this.showUploadedImages()}
                </div>
            </div>
        );
    }
}

export default FileUpload;