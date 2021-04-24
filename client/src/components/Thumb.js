import React from 'react'

export default class Thumb extends React.Component {
    state = {
      loading: false,
      thumb: undefined,
    };
  
    componentDidMount() {
      if (!this.props.file) { return; }
  
      this.setState({ loading: true }, () => {
        let reader = new FileReader();
  
        reader.onloadend = () => {
          this.setState({ loading: false, thumb: reader.result });
        };
  
        reader.readAsDataURL(this.props.file);
      });
    }
  
    render() {
      const { file } = this.props;
      const { loading, thumb } = this.state;
  
      if (!file) { return null; }
  
      if (loading) { return <p>loading...</p>; }
  
      return (<img src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200} />);
    }
  }