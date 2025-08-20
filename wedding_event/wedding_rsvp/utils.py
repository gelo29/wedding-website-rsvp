import pandas as pd
import os

def check_rsvp_code(input_code: str):
    
    try:
        BASE_DIR = os.path.dirname(__file__)
        excel_path = os.path.join(BASE_DIR, "guest_list.xls") 
        df = pd.read_excel(excel_path)

        required_cols = {"First Name", "Last Name", "Nick Name", "Code"}

        if  not required_cols.issubset(df.columns):
            raise ValueError(f"Excel file must contain columns: {required_cols}")

        input_code = str(input_code).strip()
        df["Code"] = df["Code"].astype(str).str.strip()

        results = df[df["Code"] == input_code]
        
        if results.empty:
            print("Code not found.")
            return {"no_matched":[]}
        else:
            print(f"Found {len(results)} match(es):")
            for _, row in results.iterrows():
                print(
                        f"First Name: {row['First Name']}, "
                        f"Last Name: {row['Last Name']}, "
                        f"Nick Name: {row['Nick Name']}, "
                    )
            
            return {"matched":[row['First Name'],row['Last Name'],row['Nick Name']]}
        
    except FileNotFoundError:
        print("Excel file not found. Please check the path.")
    except ValueError as e:
        print(f"{e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    check_rsvp_code("code1")
