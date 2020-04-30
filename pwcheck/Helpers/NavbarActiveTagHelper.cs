using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pwcheck.Helpers {
    [HtmlTargetElement(Attributes = "navbar-active-check")]
    public class NavbarActiveTagHelper : TagHelper {

        [HtmlAttributeName("asp-controller")]
        public string Controller { get; set; }

        [HtmlAttributeNotBound]
        [ViewContext]
        public ViewContext ViewContext { get; set; }

        public override void Process(TagHelperContext context, TagHelperOutput output) {
            base.Process(context, output);

            if (ShouldBeActive()) {
                MakeActive(output);
            }

            output.Attributes.RemoveAll("navbar-active-check");
        }

        private bool ShouldBeActive() {
            string currentController = ViewContext.RouteData.Values["Controller"].ToString();

            if (!string.IsNullOrWhiteSpace(Controller) && Controller.ToLower() != currentController.ToLower()) {
                return false;
            }

            return true;
        }

        private void MakeActive(TagHelperOutput output) {
            var classAttr = output.Attributes.FirstOrDefault(a => a.Name == "class");
            if (classAttr == null) {
                classAttr = new TagHelperAttribute("class", "active");
                output.Attributes.Add(classAttr);
            } else if (classAttr.Value == null || classAttr.Value.ToString().IndexOf("active") < 0) {
                output.Attributes.SetAttribute("class", classAttr.Value == null
                    ? "active"
                    : classAttr.Value.ToString() + " active");
            }
        }
    }
}