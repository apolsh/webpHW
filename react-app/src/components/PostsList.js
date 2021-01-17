import React from "react";
import {connect} from 'react-redux';
import { fetchPostsAndUsers, deletePost } from '../actions';

const tempPosts = [{
        title: 'Title 1',
        body: 'some title here btw',
        username: 'User1'
    },{
    title: 'Title 2',
    body: 'some title here btw 22222',
    username: 'User2222'
},{
    title: 'Title 3',
    body: 'some title here btw 3333',
    username: 'User3333'
},
]

class PostsList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex:-1
        }
    }

    componentDidMount() {
        this.props.fetchPostsAndUsers();

    }


    renderPosts(){
        return this.props.posts.map((post,index)=>{
            let user = this.props.users.find(user=>user._id === post.userId)
            user = user ? user : {username:'vasya'};

            const rootClass = this.state.selectedIndex === index ? "well selected" : "well";

            return (

                <div className={rootClass} key={index} onClick={()=>this.setState({selectedIndex: index})}>
                    <div className="media">
                        <div className="media-body">
                            <h4 className="media-heading">{post.title}</h4>
                            <p className="text-right"><span className="glyphicon glyphicon-user"></span> {user.username}</p>
                            <p>{post.body}</p>
                        </div>
                    </div>
                    <p className="text-right"><span onClick={()=>this.props.deletePost(post._id)} className="text-right glyphicon glyphicon-trash"></span></p>
                </div>


            )
        })
    }

    render() {
        return (
            <div style={{marginTop:20}} >{this.renderPosts()}</div>
            );
    }
}

const mapStateToProps = (state)=>{
    return {
        posts: state.posts,
        users: state.users
    }
}

export default connect(mapStateToProps,{fetchPostsAndUsers, deletePost})(PostsList)