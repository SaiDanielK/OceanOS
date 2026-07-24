"use client";

import { useEffect, useMemo, useState } from "react";
import { useDesktopStore } from "@/store/desktopStore";


const notes = {
	"Welcome Notes.txt": `# Notes

Welcome to OceanOS Notes!

- Type here to jot down any ideas you have.
- The content is stored locally in this session.
- If you have any suggestions on how to make this website better, feel free to submit them into the suggestion box above.
- Otherwise, have a breezy day!
`,

	"OceanOS Notes.txt": `# OceanOS Notes

Welcome to OceanOS!

Things to do:

- Add more apps
- Improve the desktop
- Add more customization
- Keep building cool features
`,
};


type Suggestion = {
	id: string;
	text: string;
};


export default function Notes() {

	const selectedNote = useDesktopStore((state) => state.selectedNote);


	const [text,setText] = useState(notes["Welcome Notes.txt"]);
	const [suggestionInput,setSuggestionInput] = useState("");
	const [suggestions,setSuggestions] = useState<Suggestion[]>([]);


	useEffect(() => {
		if(selectedNote?.name && notes[selectedNote.name as keyof typeof notes]){
			setText(notes[selectedNote.name as keyof typeof notes]);
		}

	},[selectedNote]);


	const wordCount = useMemo(() => {

		const words = text
			.trim()
			.split(/\s+/)
			.filter(Boolean);

		return words.length;

	},[text]);


	useEffect(() => {

		fetch("/api/suggestions")
			.then((res)=>res.json())
			.then((data)=>setSuggestions(data));

	},[]);



	const addSuggestion = async () => {

		const trimmed = suggestionInput.trim();

		if(!trimmed) return;


		const response = await fetch("/api/suggestions",{

			method:"POST",

			headers:{
				"Content-Type":"application/json",
			},

			body:JSON.stringify({
				text:trimmed,
			}),

		});


		const data = await response.json();

		setSuggestions(data);

		setSuggestionInput("");

	};

	const deleteSuggestion = async (id: string) => {
		const response = await fetch("/api/suggestions", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		});

		if (response.ok) {
			const data = await response.json();
			setSuggestions(data);
		}
	};



	return (

		<div className="
			flex
			h-full
			w-full
			flex-col
			bg-[#f7f1e3]
			text-[#1f2937]
		">


			<div className="
				flex
				items-center
				justify-between
				border-b
				border-[#d8cfae]
				bg-[#efe4c8]
				px-3
				py-2
				text-sm
				font-medium
			">

				<span>
					C:\Users\12139\Desktop\{selectedNote?.name ?? "notes.md"}
				</span>


				<span className="
					text-xs
					text-[#6b7280]
				">
					{wordCount} words
				</span>

			</div>



			<div className="
				border-b
				border-[#d8cfae]
				bg-[#f4ead4]
				p-3
			">


				<div className="
					mb-2
					text-xs
					font-semibold
					uppercase
					tracking-wide
					text-[#6b7280]
				">
					Suggestions
				</div>



				<div className="
					flex
					gap-2
				">


					<input

						value={suggestionInput}

						onChange={(e)=>setSuggestionInput(e.target.value)}

						onKeyDown={(e)=>{
							if(e.key==="Enter"){
								addSuggestion();
							}
						}}

						className="
							flex-1
							rounded
							border
							border-[#d8cfae]
							bg-white
							px-2
							py-1
							text-sm
							outline-none
						"

						placeholder="Enter a suggestion"

					/>


					<button

						type="button"

						onClick={addSuggestion}

						className="
							rounded
							bg-[#1f2937]
							px-2
							py-1
							text-sm
							text-white
						"

					>
						Add
					</button>


				</div>



				<ul className="
					mt-2
					space-y-1
					text-sm
				">


					{suggestions.map((suggestion)=>(

						<li

							key={suggestion.id}
							className="
								flex
								items-center
								justify-between
								rounded
								bg-white/70
								px-2
								py-1
							"
						>
							<span>{suggestion.text}</span>
							<button
								type="button"
								onClick={() => deleteSuggestion(suggestion.id)}
								className="
									ml-2 rounded bg-red-500/80 px-2 py-0.5
									text-xs text-white transition
									hover:bg-red-500"
							>
								Delete
							</button>
						</li>

					))}


				</ul>


			</div>



			<textarea

				value={text}

				onChange={(e)=>setText(e.target.value)}

				className="
					h-full
					w-full
					resize-none
					bg-transparent
					p-4
					font-mono
					text-sm
					outline-none
				"

				placeholder="Write your notes here..."

			/>


		</div>

	);

}