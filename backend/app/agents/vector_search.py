from typing import List, Dict, Any

class VectorSearchEngine:
    """Simulates high-dimensional semantic vector search over trainer skills, titles, and past bootcamps."""

    @staticmethod
    def calculate_skill_similarity(required_skills: List[str], trainer_title: str, trainer_bio: str) -> float:
        if not required_skills:
            return 85.0

        req_set = set(s.lower() for s in required_skills)
        text_corpus = (trainer_title + " " + (trainer_bio or "")).lower()

        matches = 0
        for skill in req_set:
            if skill in text_corpus:
                matches += 1

        match_ratio = matches / len(req_set)
        # Scale to 70% - 99% range
        score = 70.0 + (match_ratio * 29.0)
        return min(99.4, round(score, 1))

vector_search_engine = VectorSearchEngine()
