import React, { Component } from 'react';
import firebase from 'firebase';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import mutation from '../mutations/AddProduct';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isTitleActive: '',
            collection: '',
            isCollectionActive: '',
            price: '',
            isPriceActive: '',
            salePrice: '',
            isSalePriceActive: '',
            shipping: '',
            isShippingActive: '',
            statOne: '',
            isStatOneActive: '',
            statTwo: '',
            isStatTwoActive: '',
            statThree: '',
            isStatThreeActive: '',
            statFour: '',
            isStatFourActive: '',
            statFive: '',
            isStatFiveActive: '',
            statSix: '',
            isStatSixActive: '',
            description: '',
            isDescriptionActive: '',
            oneFitsAll: false,
            xs: false,
            s: false,
            m: false,
            l: false,
            xl: false,
            white: false,
            black: false,
            blue: false,
            green: false,
            red: false,
            fileOne: '',
            fileTwo: '',
            fileThree: '',
            fileFour: '',
            fileFive: '',
            fileSix: '',
            imageOnePreviewUrl: '',
            imageTwoPreviewUrl: '',
            imageThreePreviewUrl: '',
            imageFourPreviewUrl: '',
            imageFivePreviewUrl: '',
            imageSixPreviewUrl: '',
            uploading: false
        }
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({ uploading: true });

        function uploadImageAsPromise (imageFile, url) {
            return new Promise(function (resolve, reject) {
                var storageRef = firebase.storage().ref().child(url);

                //Upload file
                var task = storageRef.put(imageFile);

                //Update progress bar
                task.on('state_changed',
                    // function progress(snapshot){
                    //     var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    //     uploader.value = percentage;
                    // },
                    function error(err){
                        console.log('err')
                        console.log(err)
                    },
                    function complete(){
                        console.log('success')
                        var downloadURL = task.snapshot.downloadURL;
                        console.log(downloadURL)
                    }
                );
            });
        }

        const { fileOne, fileTwo, fileThree, fileFour, fileFive, fileSix } = this.state;
        // if (fileOne) {
        //     firebase.storage().ref().child(`${productId}/1`).put(fileOne)
        //         .then(snapshot => console.log(`image uploaded`))
        //         .catch(res => console.log(res));
        // }
        // if (fileTwo) {
        //     firebase.storage().ref().child(`${productId}/2`).put(fileTwo)
        //         .then(snapshot => console.log(`image uploaded`))
        //         .catch(res => console.log(res));
        // }
        // if (fileThree) {
        //     firebase.storage().ref().child(`${productId}/3`).put(fileThree)
        //         .then(snapshot => console.log(`image uploaded`))
        //         .catch(res => console.log(res));
        // }
        // if (fileFour) {
        //     firebase.storage().ref().child(`${productId}/4`).put(fileFour)
        //         .then(snapshot => console.log(`image uploaded`))
        //         .catch(res => console.log(res));
        // }
        // if (fileFive) {
        //     firebase.storage().ref().child(`${productId}/5`).put(fileFive)
        //         .then(snapshot => console.log(`image uploaded`))
        //         .catch(res => console.log(res));
        // }
        // if (fileSix) {
        //     firebase.storage().ref().child(`${productId}/6`).put(fileSix)
        //         .then(snapshot => console.log(`image uploaded`))
        //         .catch(res => console.log(res));
        // }
        const { title, description, collection, price, salePrice, shipping, statOne, statTwo, statThree, statFour, statFive, statSix } = this.state;
        const dateNow = new Date();
        const dateAdded = dateNow.valueOf();

        this.props.mutate({
            variables: { title, description, price, shipping, dateAdded, priceSale: salePrice, assortment: collection },
            //refetchQueries: [{ query }]
        }).then(res => {
            const { id } = res.data.addProduct;
            uploadImageAsPromise(fileOne, id)
        });
    }
    handleImageOneChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ fileOne: file, imageOnePreviewUrl: reader.result });
        }
        reader.readAsDataURL(file)
    }
    handleImageTwoChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ fileTwo: file, imageTwoPreviewUrl: reader.result });
        }
        reader.readAsDataURL(file)
    }
    handleImageThreeChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ fileThree: file, imageThreePreviewUrl: reader.result });
        }
        reader.readAsDataURL(file)
    }
    handleImageFourChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ fileFour: file, imageFourPreviewUrl: reader.result });
        }
        reader.readAsDataURL(file)
    }
    handleImageFiveChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ fileFive: file, imageFivePreviewUrl: reader.result });
        }
        reader.readAsDataURL(file)
    }
    handleImageSixChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ fileSix: file, imageSixPreviewUrl: reader.result });
        }
        reader.readAsDataURL(file)
    }
    render() {
        const titleLabel = this.state.title ? "active" : this.state.isTitleActive ? "active" : "";
        const collectionLabel = this.state.collection ? "active" : this.state.isCollectionActive ? "active" : "";
        const priceLabel = this.state.price ? "active" : this.state.isPriceActive ? "active" : "";
        const salePriceLabel = this.state.salePrice ? "active" : this.state.isSalePriceActive ? "active" : "";
        const shippingLabel = this.state.shipping ? "active" : this.state.isShippingActive ? "active" : "";
        const statOneLabel = this.state.statOne ? "active" : this.state.isStatOneActive ? "active" : "";
        const statTwoLabel = this.state.statTwo ? "active" : this.state.isStatTwoActive ? "active" : "";
        const statThreeLabel = this.state.statThree ? "active" : this.state.isStatThreeActive ? "active" : "";
        const statFourLabel = this.state.statFour ? "active" : this.state.isStatFourActive ? "active" : "";
        const statFiveLabel = this.state.statFive ? "active" : this.state.isStatFiveActive ? "active" : "";
        const statSixLabel = this.state.statSix ? "active" : this.state.isStatSixActive ? "active" : "";
        const descriptionLabel = this.state.description ? "active" : this.state.isDescriptionActive ? "active" : "";
        const imageOnePreview = this.state.imageOnePreviewUrl ? <img className="imgSelect" src={this.state.imageOnePreviewUrl} /> : <img className="imgSelect" src='http://vignette1.wikia.nocookie.net/towerofsaviors/images/4/47/Placeholder.png/revision/20140518072131' />;
        const imageTwoPreview = this.state.imageTwoPreviewUrl ? <img className="imgSelect" src={this.state.imageTwoPreviewUrl} /> : <img className="imgSelect" src='http://vignette1.wikia.nocookie.net/towerofsaviors/images/4/47/Placeholder.png/revision/20140518072131' />;
        const imageThreePreview = this.state.imageThreePreviewUrl ? <img className="imgSelect" src={this.state.imageThreePreviewUrl} /> : <img className="imgSelect" src='http://vignette1.wikia.nocookie.net/towerofsaviors/images/4/47/Placeholder.png/revision/20140518072131' />;
        const imageFourPreview = this.state.imageFourPreviewUrl ? <img className="imgSelect" src={this.state.imageFourPreviewUrl} /> : <img className="imgSelect" src='http://vignette1.wikia.nocookie.net/towerofsaviors/images/4/47/Placeholder.png/revision/20140518072131' />;
        const imageFivePreview = this.state.imageFivePreviewUrl ? <img className="imgSelect" src={this.state.imageFivePreviewUrl} /> : <img className="imgSelect" src='http://vignette1.wikia.nocookie.net/towerofsaviors/images/4/47/Placeholder.png/revision/20140518072131' />;
        const imageSixPreview = this.state.imageSixPreviewUrl ? <img className="imgSelect" src={this.state.imageSixPreviewUrl} /> : <img className="imgSelect" src='http://vignette1.wikia.nocookie.net/towerofsaviors/images/4/47/Placeholder.png/revision/20140518072131' />;
        return <form className="container addProductForm" onSubmit={this.onSubmit.bind(this)}>
            <div className="row">
                <Link to="/admin" className="waves-effect waves-light btn blue standardFlex col s6 m4 l2"><i className="material-icons">arrow_back</i> Back</Link>
            </div>
            <h3 className="textCenter">Add Product</h3>
            <div className="row">
                <div className="input-field col s12 m6">
                    <input
                        onFocus={() => this.setState({ isTitleActive: "active" })}
                        onBlur={() => {if (!this.state.title) this.setState({ isTitleActive: "" })}}
                        value={this.state.title}
                        onChange={e => this.setState({ title: e.target.value })}
                    />
                    <label className={titleLabel} htmlFor="title">Title</label>
                </div>
                <div className="input-field col s12 m6">
                    <input
                        onFocus={() => this.setState({ isCollectionActive: "active" })}
                        onBlur={() => {if (!this.state.collection) this.setState({ isCollectionActive: "" })}}
                        value={this.state.collection}
                        onChange={e => this.setState({ collection: e.target.value })}
                    />
                    <label className={collectionLabel} htmlFor="collection">Collection</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                    <textarea
                        id="description"
                        className="materialize-textarea"
                        onFocus={() => this.setState({ isDescriptionActive: "active" })}
                        onBlur={() => {if (!this.state.description) this.setState({ isDescriptionActive: "" })}}
                        value={this.state.description}
                        onChange={e => this.setState({ description: e.target.value })}
                    ></textarea>
                    <label className={descriptionLabel} htmlFor="description">Description</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12 m4">
                    <input
                        onFocus={() => this.setState({ isPriceActive: "active" })}
                        onBlur={() => {if (!this.state.price) this.setState({ isPriceActive: "" })}}
                        value={this.state.price}
                        onChange={e => this.setState({ price: e.target.value })}
                    />
                    <label className={priceLabel} htmlFor="price">Price</label>
                </div>
                <div className="input-field col s12 m4">
                    <input
                        onFocus={() => this.setState({ isSalePriceActive: "active" })}
                        onBlur={() => {if (!this.state.salePrice) this.setState({ isSalePriceActive: "" })}}
                        value={this.state.salePrice}
                        onChange={e => this.setState({ salePrice: e.target.value })}
                    />
                    <label className={salePriceLabel} htmlFor="salePrice">Sale Price</label>
                </div>
                <div className="input-field col s12 m4">
                    <input
                        onFocus={() => this.setState({ isShippingActive: "active" })}
                        onBlur={() => {if (!this.state.shipping) this.setState({ isShippingActive: "" })}}
                        value={this.state.shipping}
                        onChange={e => this.setState({ shipping: e.target.value })}
                    />
                    <label className={shippingLabel} htmlFor="shipping">Shipping Cost</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12 m6">
                    <input
                        onFocus={() => this.setState({ isStatOneActive: "active" })}
                        onBlur={() => {if (!this.state.statOne) this.setState({ isStatOneActive: "" })}}
                        value={this.state.statOne}
                        onChange={e => this.setState({ statOne: e.target.value })}
                    />
                    <label className={statOneLabel} htmlFor="statOne">Stat 1</label>
                </div>
                <div className="input-field col s12 m6">
                    <input
                        onFocus={() => this.setState({ isStatTwoActive: "active" })}
                        onBlur={() => {if (!this.state.statTwo) this.setState({ isStatTwoActive: "" })}}
                        value={this.state.statTwo}
                        onChange={e => this.setState({ statTwo: e.target.value })}
                    />
                    <label className={statTwoLabel} htmlFor="statTwo">Stat 2</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12 m6">
                    <input
                        onFocus={() => this.setState({ isStatThreeActive: "active" })}
                        onBlur={() => {if (!this.state.statThree) this.setState({ isStatThreeActive: "" })}}
                        value={this.state.statThree}
                        onChange={e => this.setState({ statThree: e.target.value })}
                    />
                    <label className={statThreeLabel} htmlFor="statThree">Stat 3</label>
                </div>
                <div className="input-field col s12 m6">
                    <input
                        onFocus={() => this.setState({ isStatFourActive: "active" })}
                        onBlur={() => {if (!this.state.statFour) this.setState({ isStatFourActive: "" })}}
                        value={this.state.statFour}
                        onChange={e => this.setState({ statFour: e.target.value })}
                    />
                    <label className={statFourLabel} htmlFor="statFour">Stat 4</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12 m6">
                    <input
                        onFocus={() => this.setState({ isStatFiveActive: "active" })}
                        onBlur={() => {if (!this.state.statFive) this.setState({ isStatFiveActive: "" })}}
                        value={this.state.statFive}
                        onChange={e => this.setState({ statFive: e.target.value })}
                    />
                    <label className={statFiveLabel} htmlFor="statFive">Stat 5</label>
                </div>
                <div className="input-field col s12 m6">
                    <input
                        onFocus={() => this.setState({ isStatSixActive: "active" })}
                        onBlur={() => {if (!this.state.statSix) this.setState({ isStatSixActive: "" })}}
                        value={this.state.statSixLabel}
                        onChange={e => this.setState({ statSix: e.target.value })}
                    />
                    <label className={statSixLabel} htmlFor="statSix">Stat 6</label>
                </div>
            </div>
            <div className="row sizes">
                <p>Available Sizes:</p>
                <span>
                    <input
                        type="checkbox"
                        id="oneFitsAll"
                        onChange={() => this.setState({ oneFitsAll: !this.state.oneFitsAll, xs: false, s: false, m: false, l: false, xl: false })}
                        checked={this.state.oneFitsAll}
                    />
                    <label htmlFor="oneFitsAll">One size fits all</label>
                </span>
                <span>
                    <input disabled={this.state.oneFitsAll} type="checkbox" id="xs" onChange={() => this.setState({ xs: !this.state.xs })} checked={this.state.xs} />
                    <label htmlFor="xs">XS</label>
                </span>
                <span>
                    <input disabled={this.state.oneFitsAll} type="checkbox" id="s" onChange={() => this.setState({ s: !this.state.s })} checked={this.state.s} />
                    <label htmlFor="s">S</label>
                </span>
                <span>
                    <input disabled={this.state.oneFitsAll} type="checkbox" id="m" onChange={() => this.setState({ m: !this.state.m })} checked={this.state.m} />
                    <label htmlFor="m">M</label>
                </span>
                <span>
                    <input disabled={this.state.oneFitsAll} type="checkbox" id="l" onChange={() => this.setState({ l: !this.state.l })} checked={this.state.l} />
                    <label htmlFor="l">L</label>
                </span>
                <span>
                    <input disabled={this.state.oneFitsAll} type="checkbox" id="xl" onChange={() => this.setState({ xl: !this.state.xl })} checked={this.state.xl} />
                    <label htmlFor="xl">XL</label>
                </span>
            </div>
            <div className="row colors">
                <p>Available Colors:</p>
                <span>
                    <input type="checkbox" id="white" onChange={() => this.setState({ white: !this.state.white })} checked={this.state.white} />
                    <label htmlFor="white">White</label>
                </span>
                <span>
                    <input type="checkbox" id="black" onChange={() => this.setState({ black: !this.state.black })} checked={this.state.black} />
                    <label htmlFor="black">Black</label>
                </span>
                <span>
                    <input type="checkbox" id="blue" onChange={() => this.setState({ blue: !this.state.blue })} checked={this.state.blue} />
                    <label htmlFor="blue">Blue</label>
                </span>
                <span>
                    <input type="checkbox" id="green" onChange={() => this.setState({ green: !this.state.green })} checked={this.state.green} />
                    <label htmlFor="green">Green</label>
                </span>
                <span>
                    <input type="checkbox" id="red" onChange={() => this.setState({ red: !this.state.red })} checked={this.state.red} />
                    <label htmlFor="red">Red</label>
                </span>
            </div>
            <div className="selectImageWrapper">
                <div className="imageSelectFigure">
                    <a
                        className={this.state.imageOnePreviewUrl ? 'cancelImageSelect' : 'displayNone'}
                        onClick={() => this.setState({ fileOne: '', imageOnePreviewUrl: '' })}
                    ><i className="material-icons">cancel</i></a>
                    <div className="imgPreview">{imageOnePreview}</div>
                    <label className="custom-file-upload">
                        <input type="file" onChange={ e => this.handleImageOneChange(e)} />
                        Upload Main Image
                    </label>
                </div>
                <div className="imageSelectFigure">
                    <a
                        className={this.state.imageTwoPreviewUrl ? 'cancelImageSelect' : 'displayNone'}
                        onClick={() => this.setState({ fileTwo: '', imageTwoPreviewUrl: '' })}
                    ><i className="material-icons">cancel</i></a>
                    <div className="imgPreview">{imageTwoPreview}</div>
                    <label className="custom-file-upload">
                        <input type="file" onChange={ e => this.handleImageTwoChange(e)} />
                        Upload Image 2
                    </label>
                </div>
                <div className="imageSelectFigure">
                    <a
                        className={this.state.imageThreePreviewUrl ? 'cancelImageSelect' : 'displayNone'}
                        onClick={() => this.setState({ fileThree: '', imageThreePreviewUrl: '' })}
                    ><i className="material-icons">cancel</i></a>
                    <div className="imgPreview">{imageThreePreview}</div>
                    <label className="custom-file-upload">
                        <input type="file" onChange={ e => this.handleImageThreeChange(e)} />
                        Upload Image 3
                    </label>
                </div>
                <div className="imageSelectFigure">
                    <a
                        className={this.state.imageFourPreviewUrl ? 'cancelImageSelect' : 'displayNone'}
                        onClick={() => this.setState({ fileFour: '', imageFourPreviewUrl: '' })}
                    ><i className="material-icons">cancel</i></a>
                    <div className="imgPreview">{imageFourPreview}</div>
                    <label className="custom-file-upload">
                        <input type="file" onChange={ e => this.handleImageFourChange(e)} />
                        Upload Image 4
                    </label>
                </div>
                <div className="imageSelectFigure">
                    <a
                        className={this.state.imageFivePreviewUrl ? 'cancelImageSelect' : 'displayNone'}
                        onClick={() => this.setState({ fileFive: '', imageFivePreviewUrl: '' })}
                    ><i className="material-icons">cancel</i></a>
                    <div className="imgPreview">{imageFivePreview}</div>
                    <label className="custom-file-upload">
                        <input type="file" onChange={ e => this.handleImageFiveChange(e)} />
                        Upload Image 5
                    </label>
                </div>
                <div className="imageSelectFigure">
                    <a
                        className={this.state.imageSixPreviewUrl ? 'cancelImageSelect' : 'displayNone'}
                        onClick={() => this.setState({ fileSix: '', imageSixPreviewUrl: '' })}
                    ><i className="material-icons">cancel</i></a>
                    <div className="imgPreview">{imageSixPreview}</div>
                    <label className="custom-file-upload">
                        <input type="file" onChange={ e => this.handleImageSixChange(e)} />
                        Upload Image 6
                    </label>
                </div>
            </div>
            {this.state.uploading ? <div className="row"><div className="progress col s12 m6 offset-m3"><div className="indeterminate"></div></div></div> : <div className="row"><button className="btn waves-effect waves-light col s12 m6 offset-m3">Submit</button></div>}
        </form>;
    }
}

export default graphql(mutation)(AddProduct);