import liff from '@line/liff';
const liffId = '6cc87fca6cd131070d6a7280de02ffcb';

liff.init({
    liffId: liffId
}).then(function () {
    console.log('LIFF init');

    // 這邊開始寫使用其他功能

}).catch(function (error) {
    console.log(error);
});

function Home() {
    return (
        <div>
            <h1>Welcome to My App</h1>
            <p>This is the home page.</p>
        </div>
    );
}
export default Home;