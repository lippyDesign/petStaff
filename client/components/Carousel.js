import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import { hashHistory } from 'react-router';

class Carousel extends Component {
    handleImageLoad(event) {
        
    }

    render() {
        let images;
        if (this.props.showThumbnails) {
            images = this.props.photos.map(({ url }) => ({ original: url, thumbnail: url }));
        } else {
            images = this.props.photos.map(({ url }) => ({ original: url }));
        }
        return (
        <ImageGallery
            items={images}
            slideInterval={2000}
            showThumbnails={this.props.showThumbnails || false}
            showPlayButton={this.props.showPlayButton || false}
            showFullscreenButton={this.props.showFullscreenButton || false}
            useBrowserFullscreen={this.props.showFullscreenButton ? true : false}
            showBullets={this.props.showBullets || false}
            onImageLoad={this.handleImageLoad}
            onClick={() => {
                if (this.props.click) return hashHistory.push(`/products/${this.props.id}`)
            }}
        />
        );
    }
}

export default Carousel