import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import { hashHistory } from 'react-router';

class Carousel extends Component {
    handleImageLoad(event) {
        
    }

    render() {
        const images = this.props.photos.map(({ url }) => ({ original: url }));
        return (
        <ImageGallery
            items={images}
            slideInterval={2000}
            showThumbnails={false}
            showPlayButton={false}
            showFullscreenButton={this.props.showFullscreenButton || false}
            useBrowserFullscreen={this.props.showFullscreenButton ? true : false}
            showBullets
            onImageLoad={this.handleImageLoad}
            onClick={() => {
                if (this.props.click) return hashHistory.push(`/products/${this.props.id}`)
            }}
        />
        );
    }
}

export default Carousel