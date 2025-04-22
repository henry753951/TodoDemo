import { useState } from "react";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import { PlusCircle, Trash2, CheckCircle } from "lucide-react";

export default function App() {
	const [todos, setTodos] = useState<
		{
			id: number;
			text: string;
			date: Date;
			completed: boolean;
		}[]
	>([]);
	const [input, setInput] = useState("");
	const [showCompleted, setShowCompleted] = useState(true);

	// 新增 Todo
	const addTodo = () => {
		if (input.trim()) {
			const newTodo = {
				id: Date.now(),
				text: input,
				date: new Date(),
				completed: false,
			};
			setTodos([newTodo, ...todos]);
			setInput("");
		}
	};

	// 處理按鍵事件
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			addTodo();
		}
	};

	// 切換完成狀態
	const toggleComplete = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	// 刪除 Todo
	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	// 篩選顯示的 Todo
	const filteredTodos = showCompleted
		? todos
		: todos.filter((todo) => !todo.completed);

	return (
		<div className="min-h-screen bg-gradient-to-br from-zinc-900 to-gray-800 flex items-center justify-center p-4">
			<div className="w-full max-w-md bg-gray-200/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/20">
				{/* 頂部區域 */}
				<div className="p-6 border-b border-gray-700 border-opacity-30">
					<h1 className="text-3xl font-bold text-white text-center mb-6">
						待辦事項
					</h1>
					<div className="relative flex items-center">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							className={
								"w-full bg-gray-800/50 bg-opacity-50 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
							}
							placeholder="添加新事項..."
						/>
						<button
							type="button"
							onClick={addTodo}
							className="absolute right-2 text-blue-400 hover:text-blue-300 transition-colors"
						>
							<PlusCircle size={24} />
						</button>
					</div>
				</div>

				{/* 過濾選項 */}
				<div className="flex justify-between items-center px-6 py-3 bg-gray-800/50 bg-opacity-40">
					<p className="text-gray-300 text-sm">
						{filteredTodos.length} 個待辦事項
					</p>
					<div className="flex items-center">
						<label className="flex items-center text-sm text-gray-300 cursor-pointer">
							<input
								type="checkbox"
								checked={showCompleted}
								onChange={() => setShowCompleted(!showCompleted)}
								className="mr-2 h-4 w-4"
							/>
							顯示已完成
						</label>
					</div>
				</div>

				{/* 列表區域 */}
				<div className="max-h-96 overflow-y-auto">
					{filteredTodos.length === 0 ? (
						<div className="p-12 text-center text-gray-400">沒有待辦事項</div>
					) : (
						filteredTodos.map((todo) => (
							<div
								key={todo.id}
								className={`p-4 border-b border-gray-700 border-opacity-30 hover:bg-white/5 transition-colors ${
									todo.completed ? "opacity-70" : "opacity-100"
								}`}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center flex-1">
										<button
											type="button"
											onClick={() => toggleComplete(todo.id)}
											className={`mr-3 ${
												todo.completed ? "text-green-400" : "text-gray-400"
											} hover:text-green-300 transition-colors`}
										>
											<CheckCircle size={20} />
										</button>
										<span
											className={`text-white ${
												todo.completed ? "line-through text-gray-400" : ""
											}`}
										>
											{todo.text}
										</span>
									</div>
									<div className="flex items-center">
										<span className="text-xs text-gray-400 mr-3">
											{format(todo.date, "MM/dd HH:mm", {
												locale: zhTW,
											})}
										</span>
										<button
											type="button"
											onClick={() => deleteTodo(todo.id)}
											className="text-gray-400 hover:text-red-400 transition-colors"
										>
											<Trash2 size={18} />
										</button>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
