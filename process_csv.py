import csv
import json
import os

input_file = 'public/standard_procedure_list.csv'
output_categories = 'public/standard_procedure_categories.json'
output_variations = 'public/standard_procedure_variations.json'
output_mapping = 'public/standard_procedure_mapping.json'

def parse_csv(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        # Read raw lines
        lines = [line.strip() for line in f if line.strip()]
    
    # Remove header
    if lines and lines[0].lower().startswith('category,variation'):
        lines = lines[1:]
        
    data = []
    
    # Parsing logic
    # We iterate and try to determine the category for each line.
    
    for i, line in enumerate(lines):
        parts = line.split(',')
        parts = [p.strip() for p in parts]
        
        # Heuristic to determine split point
        # Candidates:
        # 1. parts[0]
        # 2. ",".join(parts[:2])
        
        # Logic:
        # Check next line to see if it shares the prefix
        
        category = parts[0]
        variation_start_idx = 1
        
        # Check if 2 parts form a category
        if len(parts) >= 3:
            candidate_long_cat = f"{parts[0]}, {parts[1]}"
            candidate_long_cat_raw = f"{parts[0]},{parts[1]}" # In file it might be separated by comma without space or with space? 
            # The file has "비만, 체형관리". Note the space.
            # My split logic stripped parts, so matching might need care.
            
            # Let's peek at the next line (or previous lines)
            # If current line is part of a block of "A, B", then next line likely starts with "A, B" or previous line did.
            
            is_long_category = False
            
            # Check next line
            if i + 1 < len(lines):
                next_line = lines[i+1]
                next_parts = [p.strip() for p in next_line.split(',')]
                if len(next_parts) >= 2:
                    if next_parts[0] == parts[0] and next_parts[1] == parts[1]:
                        is_long_category = True
            
            # Check previous line (if we missed it by only checking next)
            # Actually, if we are consistent, checking next or prev is enough.
            # But what if it's the LAST line of a block? Then next line won't match.
            # So we typically stick to the *current decision* of the previous line if it matches prefix?
            
            if i > 0:
                prev_line_parts = lines[i-1].split(',') # raw split to check
                # Easier: store the last determined category
                pass 
                
            # If I just used '비만, 체형관리' as category for previous line, I should probably continue?
            # But I don't have state here easily unless I iterate sequentially.
            
            # Refined Logic:
            # 1. Define set of 'known multi-part categories' based on a pre-scan? 
            #    Or just local context.
            
            # Let's implement the lookahead/lookbehind logic inside the loop properly.
            pass

    # New single-pass approach with state
    final_mapping = {} # Category -> list of variations
    
    # We will buffer parsed items
    parsed_items = []

    current_cat = None
    
    for i, line in enumerate(lines):
        parts = [p.strip() for p in line.split(',')]
        
        # Attempt to decide category
        candidate_1 = parts[0]
        candidate_2 = f"{parts[0]}, {parts[1]}" if len(parts) >= 2 else None
        
        selected_cat = candidate_1
        
        # If we have a running category, bias towards it
        if current_cat:
            # Check if line starts with current_cat
            # Handle potential comma formatting in category string
            
            # If current_cat is "비만, 체형관리"
            # And line starts with "비만, 체형관리..."
            curr_cat_parts = [p.strip() for p in current_cat.split(',')]
            if len(curr_cat_parts) == 1:
                if parts[0] == current_cat:
                    selected_cat = current_cat
            else:
                # Multi-part category
                # Check if parts match
                match = True
                if len(parts) < len(curr_cat_parts):
                    match = False
                else:
                    for k in range(len(curr_cat_parts)):
                        if parts[k] != curr_cat_parts[k]:
                            match = False
                            break
                if match:
                    selected_cat = current_cat
        
        # If it doesn't match current category (or current_cat is None), we need to pick new one.
        if selected_cat != current_cat:
            # Decide between candidate_1 and candidate_2 (if available)
            # Look ahead
            if candidate_2:
                # Check if next line starts with candidate_2
                if i + 1 < len(lines):
                    next_l = lines[i+1]
                    next_p = [p.strip() for p in next_l.split(',')]
                    if len(next_p) >= 2 and next_p[0] == parts[0] and next_p[1] == parts[1]:
                        selected_cat = candidate_2
            
            current_cat = selected_cat
            
        # Now extract variation
        # variation is everything after the category parts
        cat_len = len(selected_cat.split(','))
        
        variation_parts = parts[cat_len:]
        variation = ", ".join(variation_parts) # Re-join with comma and space? Original file had space line 27?
        
        # Wait, if I join with ", ", I might introduce spaces not in original if split stripped them.
        # But `parts` are stripped.
        # Line 27: "보톡스,주름, 자갈턱" -> Cat: 보톡스. Var Parts: ["주름", "자갈턱"] -> "주름, 자갈턱"
        # This seems correct for Korean text readability.
        
        if selected_cat not in final_mapping:
            final_mapping[selected_cat] = []
        final_mapping[selected_cat].append(variation)

    return final_mapping


def main():
    mapping = parse_csv(input_file)
    
    categories = sorted(list(mapping.keys()))
    
    all_variations = set()
    for vars_list in mapping.values():
        for v in vars_list:
            all_variations.add(v)
    
    sorted_variations = sorted(list(all_variations))
    
    # Save files
    with open(output_categoires, 'w', encoding='utf-8') as f:
        json.dump(categories, f, ensure_ascii=False, indent=2)
        
    with open(output_variations, 'w', encoding='utf-8') as f:
        json.dump(sorted_variations, f, ensure_ascii=False, indent=2)

    with open(output_mapping, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, ensure_ascii=False, indent=2)
        
    print(f"Processed {len(categories)} categories and {len(sorted_variations)} variations.")

if __name__ == "__main__":
    # Fix typo in main
    global output_categoires
    output_categoires = output_categories
    main()
