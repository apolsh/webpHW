import React from 'react';
import PostsList from "./PostsList";
import OptionalDiv from "./OptionalDiv";

class App extends React.Component{
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1 col-md-3 hidden-xs">
                        <OptionalDiv/>
                    </div>
                    <div className="col-sm-10 col-md-6">
                        <PostsList/>
                    </div>
                    <div className="col-sm-1 col-md-3 hidden-xs">
                        <OptionalDiv/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;