import React, {Component} from 'react'
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
    console.log('imgList: ', imgList)
    this.setState({
      images: imgList
    })
  }

  componentDidMount () {
    this.getImagesFromApi()
  }

  renderItems () {
    const {images} = this.state
    const listItems = images.map((img) => {
      if (!!img.image) {
        return (
          <li key={img.userId}>
            <div className="img">
              <img src={img.image} alt=""/>
            </div>
          </li>
        )
      }
      return (
        <li key={img.userId}>
          <div className="img">
            <div className="defaultImg"></div>
          </div>
        </li>
      )
    })
    return (
      <div className="grid">
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div>
        <h1>GridImages</h1>
        <div>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

export default GridImages
