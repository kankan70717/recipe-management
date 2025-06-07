import { createContext, type Dispatch } from "react";
import type { TypeMainContent, TypeMainContentAction, TypeMainContentKind } from "../types/TypeMainContent";

const MainContentContext = createContext<{
	state: TypeMainContentKind,
	dispatch: Dispatch<TypeMainContentAction>
} | undefined>(undefined);