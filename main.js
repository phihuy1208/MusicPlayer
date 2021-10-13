const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cdThumb = $('.cd-thumbnail');
const heading = $('.header h2');
const cd = $('.cd');
const player = $('.player');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const previousBtn = $('.btn-prev');
const repeatBtn = $('.btn-repeat');
const randomBtn = $('.btn-random');
const audio = $('#audio');
const timeLine = $('#progress');


var app = {
    currentIndex: 0,
    isRepeatMode: false,
    isRandomMode: false,
    songs: [{
            name: 'Độ tộc 2',
            singer: 'Độ Mixi, Pháo, Phúc Du, Masew',
            image: './assets/image/Do-Toc-2.jpg',
            path: './assets/music/Do-Toc-2.mp3'
        },
        {
            name: 'Ái nộ',
            singer: 'Masew, Khôi Vũ',
            image: './assets/image/Ai-No.jpg',
            path: './assets/music/Ai-No.mp3'
        },
        {
            name: 'Câu Hẹn Câu Thề',
            singer: 'Đình Dũng',
            image: './assets/image/Cau-Hen-Cau-The.jpg',
            path: './assets/music/Cau-Hen-Cau-The.mp3'
        },
        {
            name: 'Cưới Thôi',
            singer: 'Masew, Masiu, B Ray, TAP (Việt Nam)',
            image: './assets/image/Cuoi-Thoi.jpg',
            path: './assets/music/Cuoi-Thoi.mp3'
        },
        {
            name: 'Dịu Dàng Em Đến',
            singer: 'ERIK, Ninja Z',
            image: './assets/image/Diu-Dang-Em-Den.jpg',
            path: './assets/music/Diu-Dang-Em-Den.mp3'
        },
        {
            name: 'Hãy Trao Cho Anh',
            singer: 'Sơn Tùng M-TP, Snoop Dogg',
            image: './assets/image/Hay-Trao-Cho-Anh.jpg',
            path: './assets/music/Hay-Trao-Cho-Anh.mp3'
        },
        {
            name: 'Hương',
            singer: 'Văn Mai Hương, Negav',
            image: './assets/image/Huong.jpg',
            path: './assets/music/Huong.mp3'
        },
        {
            name: 'Sài Gòn Đau Lòng Quá',
            singer: 'Hứa Kim Tuyền, Hoàng Duyên',
            image: './assets/image/Sai-Gon-Dau-Long-Qua.jpg',
            path: './assets/music/Sai-Gon-Dau-Long-Qua.mp3'
        },
        {
            name: 'Thương Nhiều Hơn Nói',
            singer: 'Đạt G, Bray, Masew',
            image: './assets/image/Thuong-Nhieu-Hon-Noi.jpg',
            path: './assets/music/Thuong-Nhieu-Hon-Noi.mp3'
        },
        {
            name: 'Tình Thương Phu Thê',
            singer: 'Chí Hướng',
            image: './assets/image/Tinh-Thuong-Phu-The.jpg',
            path: './assets/music/Tinh-Thuong-Phu-The.mp3'
        },
    ],
    autoPlay: function() {
        player.classList.add('playing');
        audio.play();
    },
    loadCurrentSong: function() {
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        heading.textContent = this.currentSong.name;
        audio.pause();
        audio.src = this.currentSong.path;
        player.classList.remove('playing');
    },
    loadNextSong: function() {
        this.currentIndex = this.currentIndex + 1 === this.songs.length ?
            0 : this.currentIndex + 1;

        this.loadCurrentSong();
        this.autoPlay();
    },
    loadPreviousSong: function() {
        this.currentIndex = this.currentIndex - 1 < 0 ?
            this.songs.length - 1 : this.currentIndex - 1;
        this.loadCurrentSong();
        this.autoPlay();
    },
    loadRandomSong: function() {
        this.currentIndex = Math.floor(Math.random() * this.songs.length);
        this.loadCurrentSong();
        this.autoPlay();
    },
    render: function() {
        var htmls = [];
        htmls = this.songs.map((song) => `<div class="song">
            <div class="contain">
                <div class="thumbnail" style='background: url("${song.image}") center / contain;'></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
            </div>
            <div class="btn btn-option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`)

        $('.playlist').innerHTML = htmls.join('\n');
    },

    difineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: () => this.songs[this.currentIndex]
        });
    },
    handleEvents: function() {
        // catch event csroll screen
        var width = cd.offsetWidth;
        var marginBottom = cd.computedStyleMap().get('margin-bottom').value - 5;
        document.onscroll = function() {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = width - scrollTop >= 0 ?
                width - scrollTop : 0;
            cd.style.width = newWidth + 'px';
            cd.style.marginBottom = marginBottom * (newWidth / width) + 5 + 'px';
            cd.style.marginTop = marginBottom * (newWidth / width) + 5 + 'px';
            cd.style.opacity = newWidth / width
        }

        // catch event choosen a song
        var listSongs = $$('.song');
        listSongs.forEach((song, index) => {
            song.onclick = () => {
                this.currentIndex = index;
                this.loadCurrentSong();
                this.autoPlay();
            }
        });

        // catch event play/stop music
        playBtn.onclick = () => {
            if (player.classList.toggle('playing'))
                audio.play();
            else
                audio.pause();
        };

        // catch active button random or repeat
        repeatBtn.onclick = () => {
            this.isRepeatMode = player.classList.toggle('repeat')
            console.log(this)
        };
        randomBtn.onclick = () => {
            this.isRandomMode = player.classList.toggle('random');
            console.log(this)
        };
        // change time line
        audio.ontimeupdate = () => {
            timeLine.valueAsNumber = Number.isNaN(audio.currentTime / audio.duration) ?
                0 : (audio.currentTime / audio.duration) * 100;
        };
        timeLine.onchange = () => {
            audio.currentTime = timeLine.valueAsNumber / 100 * audio.duration;
        }

        // catch end event to load next songs
        audio.onended = () => {
            if (this.isRepeatMode === true) {
                this.loadCurrentSong(true);
                this.autoPlay();
            } else if (this.isRandomMode === true) {
                this.loadRandomSong();
            } else this.loadNextSong();
        }

        // catch event click next or previous btn 
        nextBtn.onclick = () => {
            if (this.isRandomMode === true) {
                this.loadRandomSong();
            } else this.loadNextSong();
        }
        previousBtn.onclick = () => {
            if (this.isRandomMode === true) {
                this.loadRandomSong();
            } else this.loadPreviousSong();
        }
    },
    start: function() {
        this.difineProperties();
        this.loadCurrentSong();
        this.render();
        this.handleEvents();
    }
}

app.start();