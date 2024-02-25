export default function MainContainer(){
    return (
        <div className="main-contain h-100">
            <div className="row">
                <div className="col" id="map"></div>
                <div className="col result">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="search-results-tab" data-bs-toggle="tab" data-bs-target="#search-results" type="button" role="tab" aria-controls="search-results" aria-selected="true">搜尋結果</button>
                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">我的最愛</button>
                        </div>
                    </nav>
                    <div className="tab-content overflow-auto" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="search-results" role="tabpanel" aria-labelledby="search-results-tab" tabindex="0"></div>
                    <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="search-results-tab" tabindex="0"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}