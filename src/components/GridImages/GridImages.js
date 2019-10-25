import React, {Component} from 'react'
import Slider from 'react-slick'
import axios from 'axios'

class GridImages extends Component {
  constructor (props) {
    super(props)

    this.state = {
      images: []
    }
  }

  async getImagesFromApi () {
    const result = await axios({
      method: 'post',
      url: 'https://listings.salespaddock.com/api/GetAroundYouUsers',
      headers: {
        'Content-Type': 'application/json',
        'horse': 123456
      },
      data: {'userId': '0', 'long': -70.648258253932, 'lat': 43.1617483003778, 'redious': '2000'}
    })
    const {response: imgList} = result.data
    const images = imgList.map(img => ({
      ...img,
      loaded: false,
      classes: ['loading']
    }))
    this.setState({
      images
    })
  }

  componentDidMount () {
    this.getImagesFromApi()
    console.log('env: ', process.env);
  }

  onLoadImage (img) {
    const self = this;
    const image = new Image()
    image.onload = function () {
      self.setState((prevState) => {
        const listImages = prevState.images;
        const imgNeedUpdateIndex = listImages.findIndex(ima => ima.userId === img.userId)
        listImages[imgNeedUpdateIndex].loaded = true;
        listImages[imgNeedUpdateIndex].classes = [];
        return {
          images: listImages
        }
      })
    }
    image.src = img.image
  }

  renderItems () {
    const {images} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      lazyLoad: true,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            dots: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
          }
        }
      ]
    }
    const listItems = images.map((img) => (
      <div key={img.userId} className="img-container">
        <div className="img">
          <img className={img.classes.join(' ')} src={img.image} alt="" onLoad={() => this.onLoadImage(img)}/>
          {this.renderImgLoading(img)}
        </div>
      </div>
    ))
    return (
      <div className="grid">
        <div className="container">
          <Slider {...settings}>
            {listItems}
          </Slider>
        </div>
      </div>
    )
  }

  renderImgLoading (img) {
    const {loaded} = img
    return !loaded
      && (<div className="img-loading">
        <div className="lds-dual-ring"></div>
      </div>)
  }

  render () {
    return (
      <div>
        <h1>GridImages</h1>
        <div className="image-container">
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

export default GridImages
