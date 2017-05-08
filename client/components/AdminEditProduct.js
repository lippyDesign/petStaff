import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import firebase from 'firebase';

import cameraPic from '../../style/selectPic.png'

// queries to refetch (not going inside of component as props)
import fetchProductsAdmin from '../queries/fetchProductsAdmin';
import fetchRandomProducts from '../queries/fetchRandomProducts';
import fetchProducts from '../queries/fetchProducts';

// mutations as props
import addPhotoToProductMutation from '../mutations/AddPhotoToProduct';
import addColorToProductMutation from '../mutations/AddColorToProduct';
import addSizeToProductMutation from '../mutations/AddSizeToProduct';
import editProductMutation from '../mutations/EditProduct';

class AdminEditProduct extends Component {
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
            isOtherColorOneActive: '',
            otherColorOne: '',
            isOtherColorTwoActive: '',
            otherColorTwo: '',
            isOtherColorThreeActive: '',
            otherColorThree: '',
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
            uploading: false,
            error: '',
            otherColors: []
        }
    }
    componentDidMount() {
        // when component mounts we'll get the data about the product (as props from the wrapper) and fill in the form
        const { title, assortment, description, price, priceSale, shipping, statOne, statTwo, statThree, statFour, statFive, statSix, sizes, colors, photos } = this.props.product;
        this.setState({
            title,
            collection: assortment,
            description,
            price,
            salePrice: priceSale,
            shipping,
            statOne, statTwo, statThree, statFour, statFive, statSix,
        });
        sizes.forEach(({ value }) => {
            if (value === 'oneSizeFitsAll') this.setState({ oneFitsAll: true });
            if (value === 'xs') this.setState({ xs: true });
            if (value === 's') this.setState({ s: true });
            if (value === 'm') this.setState({ m: true });
            if (value === 'l') this.setState({ l: true });
            if (value === 'xl') this.setState({ xl: true });
        });
        colors.forEach(({ value }) => {
            if (value === 'white') this.setState({ white: true });
            else if (value === 'black') this.setState({ black: true });
            else if (value === 'blue') this.setState({ blue: true });
            else if (value === 'green') this.setState({ green: true });
            else if (value === 'red') this.setState({ red: true });
            else {
                const arr = this.state.otherColors;
                arr.push(value);
                this.setState({ otherColors: arr })
            }
        });
        if (photos[0]) this.setState({ imageOnePreviewUrl: photos[0].url })
        if (photos[1]) this.setState({ imageTwoPreviewUrl: photos[1].url })
        if (photos[2]) this.setState({ imageThreePreviewUrl: photos[2].url })
        if (photos[3]) this.setState({ imageFourPreviewUrl: photos[3].url })
        if (photos[4]) this.setState({ imageFivePreviewUrl: photos[4].url })
        if (photos[5]) this.setState({ imageSixPreviewUrl: photos[5].url })
    }
    renderOtherColors() {
        // if product contains more colors than those in check boxes, they will be rendered in a list
        if (this.state.otherColors.length) {
            return <div className="col s12">
                <ul className="collection">
                    {this.state.otherColors.map(color => <li key={color} className='collection-item adminProductView'>
                        <span>{color}</span>
                        <i onClick={this.onColorDelete.bind(this, color)} className='material-icons adminDeleteProductIcon'>delete</i>
                    </li>)}
                </ul>
            </div>
        }
    }
    onColorDelete(color) {
        // removes color from additional color list
        const arr = this.state.otherColors;
        const index = arr.indexOf(color);
        arr.splice(index, 1);
        this.setState({ otherColors: arr })
    }
    onSubmit(e) {
        // save changes to the product into the database
        e.preventDefault();
        this.setState({ uploading: true, error: '' });

        function uploadImageAsPromise (imageFile, id, i, m) {
            return new Promise(function (resolve, reject) {
                var storageRef = firebase.storage().ref().child(`${id}/${i + 1}`);
                //Upload file
                var task = storageRef.put(imageFile);
                //Update progress bar
                task.on('state_changed',
                    function complete(){
                        var downloadURL = task.snapshot.downloadURL;
                        if (downloadURL) {
                            console.log('success')
                            console.log(downloadURL)
                            m({
                                variables: { productId: id, photo: downloadURL }
                            })
                        }
                    },
                    function error(err){
                        console.log('err')
                        console.log(err)
                    }
                );
            });
        }

        const { fileOne, fileTwo, fileThree, fileFour, fileFive, fileSix } = this.state;
        const { white, black, blue, green, red, otherColorOne, otherColorTwo, otherColorThree } = this.state;
        const { oneFitsAll, xs, s, m, l, xl } = this.state;
        const { title, description, collection, price, salePrice, shipping, statOne, statTwo, statThree, statFour, statFive, statSix } = this.state;

        const sizeValidation = [oneFitsAll, xs, s, m, l, xl].some(i => i === true);
        const colorValidation = [white, black, blue, green, red, otherColorOne, otherColorTwo, otherColorThree, this.state.otherColors.length].some(i => i);
        const imageValidation = this.state.fileOne || this.state.imageOnePreviewUrl;
        const validation = [sizeValidation, colorValidation, title, price, imageValidation].every(i => i);
        if (!validation) {
            return this.setState({
                uploading: false,
                error: 'title, price, main image, at least one color and at least one size are required'
            });
        }

        const dateNow = new Date();
        const dateModified = dateNow.valueOf();
        const id = this.props.product.id

        let { imageOnePreviewUrl, imageTwoPreviewUrl, imageThreePreviewUrl, imageFourPreviewUrl, imageFivePreviewUrl, imageSixPreviewUrl } = this.state;
        const imageMain = fileOne ? '' : imageOnePreviewUrl ? imageOnePreviewUrl : '';
        const imageTwo = fileTwo ? '' : imageTwoPreviewUrl ? imageTwoPreviewUrl : '';
        const imageThree = fileThree ? '' : imageThreePreviewUrl ? imageThreePreviewUrl : '';
        const imageFour = fileFour ? '' : imageFourPreviewUrl ? imageFourPreviewUrl : '';
        const imageFive = fileFive ? '' : imageFivePreviewUrl ? imageFivePreviewUrl : '';
        const imageSix = fileSix ? '' : imageSixPreviewUrl ? imageSixPreviewUrl : '';
        this.props.editProductMutation({
            variables: { id, title, description, assortment: collection, price, priceSale: salePrice, shipping, dateModified, statOne, statTwo, statThree, statFour, statFive, statSix,
                imageMain, imageTwo, imageThree, imageFour, imageFive, imageSix },
            refetchQueries: [{ query: fetchProducts }, { query: fetchProductsAdmin }, { query: fetchRandomProducts }]
        })
        .then(res => {
            [fileOne, fileTwo, fileThree, fileFour, fileFive, fileSix].forEach((img, i) => {
                if (img) {
                    const m = this.props.addPhotoToProductMutation;
                     uploadImageAsPromise(img, id, i, m)
                }
            })
            const whi = {name: 'white', exists: white}
            const blk = {name: 'black', exists: black}
            const blu = {name: 'blue', exists: blue}
            const grn = {name: 'green', exists: green}
            const rd = {name: 'red', exists: red}
            const ocOne = {name: otherColorOne, exists: otherColorOne}
            const ocTwo = {name: otherColorTwo, exists: otherColorTwo}
            const ocThree = {name: otherColorThree, exists: otherColorThree}
            const colorArray = [whi, blk, blu, grn, rd, ocOne, ocTwo, ocThree, ...this.state.otherColors];
            // colors
            colorArray.forEach(({ name, exists }) => {
                if (exists) {
                    this.props.addColorToProductMutation({
                        variables: { productId: id, color: name.toLowerCase() }
                    })
                }
            })
            const oneFitsAllSizes = {name: 'oneSizeFitsAll', exists: oneFitsAll};
            const extraSmall = {name: 'xs', exists: xs};
            const small = {name: 's', exists: s};
            const medium = {name: 'm', exists: m};
            const large = {name: 'l', exists: l};
            const extraLarge = {name: 'xl', exists: xl};
            const sizeArray = [oneFitsAllSizes, extraSmall, small, medium, large, extraLarge];
            //sizes
            sizeArray.forEach(({ name, exists }) => {
                if (exists) {
                    this.props.addSizeToProductMutation({
                        variables: { productId: id, size: name }
                    })
                }
            })
        })
        .then(() => {
            hashHistory.push('/admin');
            //window.location.reload();
        })
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
        const otherColorOneLabel = this.state.otherColorOne ? "active" : this.state.isOtherColorOneActive ? "active" : "";
        const otherColorTwoLabel = this.state.otherColorTwo ? "active" : this.state.isOtherColorTwoActive ? "active" : "";
        const otherColorThreeLabel = this.state.otherColorThree ? "active" : this.state.isOtherColorThreeActive ? "active" : "";
        const descriptionLabel = this.state.description ? "active" : this.state.isDescriptionActive ? "active" : "";
        const imageOnePreview = this.state.imageOnePreviewUrl ? <img className="imgSelect" src={this.state.imageOnePreviewUrl} /> : <img className="imgSelect" src={cameraPic} />;
        const imageTwoPreview = this.state.imageTwoPreviewUrl ? <img className="imgSelect" src={this.state.imageTwoPreviewUrl} /> : <img className="imgSelect" src={cameraPic} />;
        const imageThreePreview = this.state.imageThreePreviewUrl ? <img className="imgSelect" src={this.state.imageThreePreviewUrl} /> : <img className="imgSelect" src={cameraPic} />;
        const imageFourPreview = this.state.imageFourPreviewUrl ? <img className="imgSelect" src={this.state.imageFourPreviewUrl} /> : <img className="imgSelect" src={cameraPic} />;
        const imageFivePreview = this.state.imageFivePreviewUrl ? <img className="imgSelect" src={this.state.imageFivePreviewUrl} /> : <img className="imgSelect" src={cameraPic} />;
        const imageSixPreview = this.state.imageSixPreviewUrl ? <img className="imgSelect" src={this.state.imageSixPreviewUrl} /> : <img className="imgSelect" src={cameraPic} />;
        return <form className="container addProductForm" onSubmit={this.onSubmit.bind(this)}>
            <div className="row">
                <Link to="/admin" className="waves-effect waves-light btn blue standardFlex col s6 m4 l2"><i className="material-icons">arrow_back</i> Back</Link>
            </div>
            <h3 className="textCenter">Edit Product</h3>
            <h5 className="textCenter">{this.props.product.id}</h5>
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
                        value={this.state.statSix}
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
                <div className="col s12">
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
                {this.renderOtherColors()}
                <div className="input-field col s12 l4">
                    <input
                        onFocus={() => this.setState({ isOtherColorOneActive: "active" })}
                        onBlur={() => {if (!this.state.otherColorOne) this.setState({ isOtherColorOneActive: "" })}}
                        value={this.state.otherColorOne}
                        onChange={e => this.setState({ otherColorOne: e.target.value })}
                    />
                    <label className={otherColorOneLabel} htmlFor="statSix">Other Color</label>
                </div>
                <div className="input-field col s12 l4">
                    <input
                        onFocus={() => this.setState({ isOtherColorTwoActive: "active" })}
                        onBlur={() => {if (!this.state.otherColorTwo) this.setState({ isOtherColorTwoActive: "" })}}
                        value={this.state.otherColorTwo}
                        onChange={e => this.setState({ otherColorTwo: e.target.value })}
                    />
                    <label className={otherColorTwoLabel} htmlFor="statSix">Other Color</label>
                </div>
                <div className="input-field col s12 l4">
                    <input
                        onFocus={() => this.setState({ isOtherColorThreeActive: "active" })}
                        onBlur={() => {if (!this.state.otherColorThree) this.setState({ isOtherColorThreeActive: "" })}}
                        value={this.state.otherColorThree}
                        onChange={e => this.setState({ otherColorThree: e.target.value })}
                    />
                    <label className={otherColorThreeLabel} htmlFor="statSix">Other Color</label>
                </div>
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
            <p className='textRed textCenter'>{this.state.error}</p>
            {this.state.uploading ? <div className="row"><div className="progress col s12 m6 offset-m3"><div className="indeterminate"></div></div></div> : <div className="row"><button className="btn waves-effect waves-light col s12 m6 offset-m3">save changes</button></div>}
        </form>;
    }
}

export default graphql(addSizeToProductMutation, {name: 'addSizeToProductMutation'})(graphql(addColorToProductMutation, {name : 'addColorToProductMutation'})(graphql(editProductMutation, {name : 'editProductMutation'})(graphql(addPhotoToProductMutation, {name: 'addPhotoToProductMutation'})(AdminEditProduct))));