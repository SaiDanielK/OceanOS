"use client";

import { useEffect, useRef, useState } from "react";
import { useDesktopStore } from "@/store/desktopStore";


const songs = [
	{
		title:"Go Big or Go Home",
		artist:"Enhypen",
		file:"/music/bighome.mp3",
		cover:"/covers/bighome.jpg",
	},
	{
		title:"Blinding Lights",
		artist:"The Weeknd",
		file:"/music/BlindingLights.mp3",
		cover:"/covers/BlindingLights.jpg",
	},
	{
		title:"Fever",
		artist:"Enhypen",
		file:"/music/fever.mp3",
		cover:"/covers/fever.jpg",
	},
	{
		title:"GO",
		artist:"Cortis",
		file:"/music/go.mp3",
		cover:"/covers/go.jpg",
	},
	{
		title:"Golden Hour",
		artist:"JVKE",
		file:"/music/GoldenHour.mp3",
		cover:"/covers/GoldenHour.jpg",
	},
	{
		title:"Brought the Heat Back",
		artist:"Enhypen",
		file:"/music/heat.mp3",
		cover:"/covers/heat.jpg",
	},
	{
		title:"I Like Me Better",
		artist:"Lauv",
		file:"/music/likemebetter.mp3",
		cover:"/covers/likemebetter.jpg",
	},
	{
		title:"Sunflower",
		artist:"Post Malone & Swae Lee",
		file:"/music/Sunflower.mp3",
		cover:"/covers/Sunflower.jpg",
	},
	{
		title:"Sweet Venom",
		artist:"Enhypen",
		file:"/music/SweetVenom.mp3",
		cover:"/covers/SweetVenom.jpg",
	},
	{
		title:"XO",
		artist:"Enhypen",
		file:"/music/xo.mp3",
		cover:"/covers/xo.jpg",
	},
];


export default function Music(){

	const selectedMusic = useDesktopStore(
		(state)=>state.selectedMusic
	);


	const [currentSong,setCurrentSong] = useState(()=>{

		if(!selectedMusic){
			return 0;
		}


		const index = songs.findIndex(
			(song)=>song.file===selectedMusic.path
		);


		return index >= 0 ? index : 0;

	});


	const [isPlaying,setIsPlaying] = useState(false);
	const [currentTime,setCurrentTime] = useState(0);
	const [duration,setDuration] = useState(0);


	const audioRef = useRef<HTMLAudioElement|null>(null);



	useEffect(()=>{

		if(!selectedMusic){
			return;
		}


		const index = songs.findIndex(
			(song)=>song.file===selectedMusic.path
		);


		if(index >= 0){

			setCurrentSong(index);

			setTimeout(()=>{

				audioRef.current?.play();

				setIsPlaying(true);

			},100);

		}


	},[selectedMusic]);



	const togglePlay = ()=>{

		if(!audioRef.current){
			return;
		}


		if(isPlaying){

			audioRef.current.pause();

		}else{

			audioRef.current.play();

		}


		setIsPlaying(!isPlaying);

	};



	const handleNext = ()=>{

		setCurrentSong((prev)=>{

			return (prev + 1) % songs.length;

		});


		setTimeout(()=>{

			audioRef.current?.play();

			setIsPlaying(true);

		},100);

	};



	const handlePrev = ()=>{

		setCurrentSong((prev)=>{

			return (
				(prev - 1 + songs.length)
				% songs.length
			);

		});


		setTimeout(()=>{

			audioRef.current?.play();

			setIsPlaying(true);

		},100);

	};



	const progress =
		duration > 0
		? (currentTime / duration) * 100
		: 0;



	const formatTime = (time:number)=>{

		if(!time){
			return "0:00";
		}


		const minutes = Math.floor(time / 60);

		const seconds = Math.floor(time % 60);


		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

	};

	return (
		<div className="
			h-full
			flex
			flex-col
			text-white
		">


			<div className="
				flex
				flex-col
				items-center
				pt-6
				px-6
				shrink-0
			">


				<p className="
					text-xs
					tracking-[0.4em]
					uppercase
					text-white/50
					mb-5
				">
					Now Playing
				</p>



				<div className="
					w-56
					h-56
					rounded-3xl
					bg-white/10
					overflow-hidden
					shadow-2xl
					backdrop-blur-xl
				">

					<img
						src={songs[currentSong].cover}
						alt={songs[currentSong].title}
						className="
							w-full
							h-full
							object-cover
						"
					/>

				</div>



				<h2 className="
					mt-6
					text-3xl
					font-semibold
					text-center
				">

					{songs[currentSong].title}

				</h2>



				<p className="text-white/60">

					{songs[currentSong].artist}

				</p>




				<div className="
					mt-8
					w-full
					px-6
				">


					<div

						className="
							h-2
							rounded-full
							bg-white/10
							overflow-hidden
							cursor-pointer
						"

						onClick={(e)=>{

							if(!audioRef.current){
								return;
							}


							const rect =
								e.currentTarget.getBoundingClientRect();


							const percent =
								(e.clientX - rect.left)
								/ rect.width;


							audioRef.current.currentTime =
								percent * duration;

						}}

					>


						<div

							className="
								h-full
								bg-cyan-400
								transition-all
							"

							style={{
								width:`${progress}%`
							}}

						/>


					</div>



					<div className="
						flex
						justify-between
						text-xs
						text-white/50
						mt-2
					">

						<span>
							{formatTime(currentTime)}
						</span>


						<span>
							{formatTime(duration)}
						</span>

					</div>


				</div>




				<div className="
					flex
					justify-center
					gap-8
					mt-8
				">


					<button

						onClick={handlePrev}

						className="
							w-12
							h-12
							rounded-full
							border
							border-white/10
							bg-white/10
							backdrop-blur-xl
						"

					>
						◀
					</button>



					<button

						onClick={togglePlay}

						className="
							w-16
							h-16
							rounded-full
							bg-cyan-400
							text-black
							text-2xl
						"

					>

						{isPlaying ? "❚❚" : "▶"}

					</button>



					<button

						onClick={handleNext}

						className="
							w-12
							h-12
							rounded-full
							border
							border-white/10
							bg-white/10
							backdrop-blur-xl
						"

					>
						▶▶
					</button>


				</div>


			</div>




			<div className="
				flex-1
				overflow-y-auto
				mt-6
				px-4
				space-y-3
			">


				{songs.map((song,index)=>(


					<div

						key={song.title}

						onClick={()=>{

							setCurrentSong(index);


							setTimeout(()=>{

								audioRef.current?.play();

								setIsPlaying(true);

							},100);

						}}

						className={`
							flex
							items-center
							gap-4
							rounded-2xl
							p-3
							cursor-pointer
							transition
							border
							border-white/10
							backdrop-blur-xl
							${
								index===currentSong
								? "bg-cyan-400/20"
								: "bg-white/5 hover:bg-white/10"
							}
						`}

					>


						<img

							src={song.cover}

							alt={song.title}

							className="
								w-14
								h-14
								rounded-xl
								object-cover
							"

						/>



						<div>

							<h3 className="font-medium">
								{song.title}
							</h3>


							<p className="
								text-sm
								text-white/60
							">
								{song.artist}
							</p>

						</div>


					</div>


				))}


			</div>




			<audio

				ref={audioRef}

				src={songs[currentSong].file}


				onLoadedMetadata={()=>{

					if(audioRef.current){

						setDuration(
							audioRef.current.duration
						);

					}

				}}


				onTimeUpdate={()=>{

					if(audioRef.current){

						setCurrentTime(
							audioRef.current.currentTime
						);

					}

				}}


				onEnded={handleNext}

			/>


		</div>
	);
}  