"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useDesktopStore } from "@/store/desktopStore";

const initialNotes: Note[] = [
	{
		id: "welcome",
		title: "Welcome to Notes",
		content: `# Welcome to OceanOS Notes!
		
- Type here to jot down any ideas you have.
- Your notes are saved automatically in your browser.
- Create new notes, or delete old ones.
- Have a breezy day!`,
	},
	{
		id: "todos",
		title: "OceanOS Ideas",
		content: `# OceanOS To-Do
		
Here are some ideas for the future:
		
- [ ] Add more cool apps
- [ ] Improve the desktop experience
- [ ] Add more customization options
- [ ] Keep building awesome features`,
	},
];

type Note = {
	id: string;
	title: string;
	content: string;
};

type Suggestion = {
	id: string;
	text: string;
};

export default function Notes() {
	const selectedNote = useDesktopStore((state) => state.selectedNote);

	const [notes, setNotes] = useState<Note[]>([]);
	const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

	const [suggestionInput, setSuggestionInput] = useState("");
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

	useEffect(() => {
		// Temporarily disabled localStorage loading
		setNotes(initialNotes);
		setActiveNoteId(initialNotes[0].id);
	}, []);

	useEffect(() => {
		// Temporarily disabled localStorage saving
		fetch("/api/suggestions")
			.then((res) => res.json())
			.then((data) => setSuggestions(data));
	}, [notes]);

	useEffect(() => {
		if (selectedNote?.path) {
			const note = notes.find(n => n.id === selectedNote.path);
			if (note && note.id !== activeNoteId) {
				setActiveNoteId(note.id);
			}
		}
	}, [selectedNote]);

	const activeNote = useMemo(() => notes.find(note => note.id === activeNoteId), [notes, activeNoteId]);

	const updateNoteContent = (content: string) => {
		if (!activeNoteId) return;
		setNotes(prevNotes =>
			prevNotes.map(note =>
				note.id === activeNoteId ? { ...note, content } : note
			)
		);
	};

	const createNewNote = () => {
		const newNote: Note = {
			id: `note_${Date.now()}`,
			title: "Untitled Note",
			content: "",
		};
		setNotes(prev => [newNote, ...prev]);
		setActiveNoteId(newNote.id);
	};

	const deleteNote = (idToDelete: string) => {
		setNotes(prev => prev.filter(note => note.id !== idToDelete));
		if (activeNoteId === idToDelete) {
			const remainingNotes = notes.filter(note => note.id !== idToDelete);
			setActiveNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null);
		}
	};

	const addSuggestion = async () => {
		const trimmed = suggestionInput.trim();
		if (!trimmed) return;

		const response = await fetch("/api/suggestions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: trimmed,
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


	const stats = useMemo(() => {
		if (!activeNote) return { words: 0, chars: 0 };
		const content = activeNote.content || "";
		const words = content.trim().split(/\s+/).filter(Boolean).length;
		const chars = content.length;
		return { words, chars };
	}, [activeNote]);

	return (
		<div className="
			flex
			h-full
			w-full
			bg-black/70
			text-white
		">
			{/* Sidebar */}
			<div className="w-70 shrink-0 border-r border-white/10 bg-black/20 p-3 flex flex-col backdrop-blur-md overflow-y-hidden">
				<div className="flex items-center justify-between mb-3">
					<h2 className="text-lg font-semibold tracking-wide">Notes</h2>
					<button
						onClick={createNewNote}
						className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-lg text-white/80 transition hover:bg-cyan-400/20 hover:text-cyan-300"
						title="Create new note"
					>
						+
					</button>
				</div>
				<div className="overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-cyan-400/20 scrollbar-track-transparent mb-4">
					{notes.map(note => (
						<div
							key={note.id}
							onClick={() => setActiveNoteId(note.id)}
							className={`group relative cursor-pointer rounded-lg px-3 py-2 transition ${activeNoteId === note.id ? "bg-cyan-400/20" : "hover:bg-white/10"
								}`}
						>
							<p className="truncate text-sm font-medium text-white/90">{note.title}</p>
							<p className="truncate text-xs text-white/50">{note.content.split('\n')[0] || "No content"}</p>
							<button
								onClick={(e) => {
									e.stopPropagation();
									deleteNote(note.id);
								}}
								className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-md bg-red-500/20 text-white/70 opacity-0 transition hover:bg-red-500/40 group-hover:opacity-100 flex items-center justify-center text-xs"
							>
								🗑️
							</button>
						</div>
					))}
				</div>

				{/* Suggestions Box */}
				<div className="mt-auto pt-3 border-t border-white/10">
					<h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/60 px-1">
						Suggestions
					</h3>
					<div className="flex gap-2 mb-2">
						<input
							value={suggestionInput}
							onChange={(e) => setSuggestionInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									addSuggestion();
								}
							}}
							className="flex-1 rounded-md border border-white/20 bg-white/10 px-2 py-1 text-sm text-white/90 outline-none placeholder:text-white/40 focus:border-cyan-400/50"
							placeholder="Add a suggestion..."
						/>
						<button
							type="button"
							onClick={addSuggestion}
							className="rounded-md bg-cyan-500/80 px-3 py-1.5 text-md text-white transition hover:bg-cyan-500"
						>
							Add
						</button>
					</div>
					<ul className="space-y-1.5 overflow-y-auto max-h-40 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-1">
						{suggestions.map((suggestion) => (
							<li
								key={suggestion.id}
								className="group flex items-center justify-between rounded-lg bg-white/5 px-2 py-1.5 text-sm"
							>
								<span className="text-white/80">{suggestion.text}</span>
								<button
									type="button"
									onClick={() => deleteSuggestion(suggestion.id)}
									className="ml-2 rounded-md bg-red-500/20 px-2 py-0.5 text-xs text-red-300 opacity-0 transition hover:bg-red-500/40 group-hover:opacity-100"
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Main Editor */}
			<div className="flex flex-1 flex-col bg-gradient-to-br from-slate-900/50 to-slate-800/20">
				{activeNote ? (
					<div className="w-full max-w-4xl mx-auto flex flex-col h-full">
						<div className="flex items-center justify-between border-b border-white/10 px-4 py-3 shrink-0">
							<input
								type="text"
								value={activeNote.title}
								onChange={(e) => {
									const newTitle = e.target.value;
									setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, title: newTitle } : n));
								}}
								className="w-full bg-transparent text-xl font-semibold text-white/90 outline-none placeholder:text-white/40"
								placeholder="Note Title"
							/>
							<div className="flex gap-4 text-xs text-white/50 shrink-0 ml-4">
								<span>{stats.words} words</span>
								<span>{stats.chars} characters</span>
							</div>
						</div>
						<textarea
							value={activeNote.content}
							onChange={(e) => updateNoteContent(e.target.value)}
							className="h-full w-full resize-none bg-transparent p-8 text-base leading-relaxed text-white/80 outline-none scrollbar-thin scrollbar-thumb-cyan-400/20 scrollbar-track-transparent"
							placeholder="Start writing your note here..."
						/>
					</div>
				) : (
					<div className="flex h-full items-center justify-center text-white/50">
						<div className="text-center">
							<p className="text-2xl">📝</p>
							<p className="mt-2">Select a note to view or create a new one.</p>
						</div>
					</div>
				)}
				</div>
		</div>
	);
}